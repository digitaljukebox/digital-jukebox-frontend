<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <template v-if="subPage">
          <q-btn
            flat
            :ripple="false"
            icon="fas fa-chevron-left"
            @click="$router.back()"
          />
          <q-toolbar-title>
            {{title}}
          </q-toolbar-title>
        </template>

        <template v-else>
        <q-btn
          v-if="$q.screen.lt.md"
          flat
          dense
          round
          icon="fas fa-bars"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
        <q-toolbar-title class="q-ml-sm">
          {{title}}
        </q-toolbar-title>
        </template>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
      content-style="display: flex;flex-direction: column;"
    >
      <template v-if="user">
        <q-list>
          <EssentialLink
            v-for="link in essentialLinks"
            :key="link.title"
            v-bind="link"
          />
          <q-item clickable @click="toSpotifyAuth" v-if="!loggedInToSpotify">
            <q-item-section avatar>
              <q-icon name="fab fa-spotify" />
            </q-item-section>

            <q-item-section>
              <q-item-label>Connect with Spotify</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
        <div class="row" style="flex-grow: 1"></div>
        <q-separator />
        <div class="row justify-center q-mt-sm items-center q-gutter-md">
          <q-avatar v-if="user.photoURL">
            <img :src="user.photoURL" />
          </q-avatar>
          <span v-if="user.displayName">{{ user.displayName }}</span>
          <span v-else-if="user.email">{{ user.email }}</span>
        </div>
        <div
          class="row justify-center q-mt-sm items-center q-gutter-md"
          v-if="spotifyUser"
        >
          <q-avatar>
            <q-icon name="fab fa-spotify" />
          </q-avatar>
          <span v-if="spotifyUser.displayName">{{
            spotifyUser.displayName
          }}</span>
        </div>
        <div class="row justify-center q-mt-md q-mb-lg">
          <q-btn color="primary" label="Log Out" @click="signOut" />
        </div>
      </template>
      <template v-else>
        <q-list>
          <EssentialLink
            v-bind="{ title: 'Log in', icon: 'fas fa-user', path: '/login' }"
          />
        </q-list>
      </template>
    </q-drawer>

    <q-page-container>
      <transition
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
        :duration="300"
      >
      <router-view />
      </transition>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import EssentialLink from 'components/EssentialLink.vue';

const linksData = [
  {
    title: 'Home',
    icon: 'fas fa-home',
    link: '/home'
  },
  {
    title: 'Nearby Venues',
    icon: 'fas fa-map-marker',
    link: '/nearby'
  },
  {
    title: 'Your Profile',
    icon: 'fas fa-user',
    link: '/profile'
  },
  {
    title: 'Manage Venues',
    link: '/manage-venues',
    icon: 'fas fa-sliders-h'
  }
];

import { defineComponent, ref } from '@vue/composition-api';
import firebase from 'firebase';
import { getSpotifyOAuthAuthURI } from 'src/services/firebase/spotify';
import { toSpotifySignIn } from '../services/firebase/spotify';
import { mapGetters } from 'vuex';
import axios from 'axios';
import { SpotifyUser } from '../types';

export default defineComponent({
  name: 'MainLayout',
  components: { EssentialLink },
  setup() {
    const leftDrawerOpen = ref(false);
    const essentialLinks = ref(linksData);

    return { leftDrawerOpen, essentialLinks };
  },
  data() {
    return {
      title: document.title.substring(0, document.title.indexOf(" |")) || 'Digital Jukebox',
      user: null,
      spotifyUser: null as SpotifyUser
    };
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      this.user = user;
    });
  },
  beforeRouteLeave (to, from, next) {
    this.title = to.meta.pageName || 'Digital Jukebox';
    next();
  },
  beforeRouteUpdate (to, from, next) {
    this.title = to.meta.pageName || 'Digital Jukebox';
    next();
  },
  computed: {
    ...mapGetters('spotify', ['isSpotifyLogin', 'getSpotifyAuth']),
    loggedInToSpotify() {
      return (this as any).isSpotifyLogin;
    },
    subPage() {
      return this.$route.meta.subPage;
    }
  },
  mounted() {
    if (this.loggedInToSpotify) {
      this.setSpotifyUser();
    }
  },
  watch: {
    loggedInToSpotify(val) {
      if (val) {
        this.setSpotifyUser();
      }
    }
  },
  methods: {
    signOut() {
      firebase.auth().signOut();
      this.$router.push('/login');
    },
    toSpotifyAuth() {
      toSpotifySignIn();
    },
    setSpotifyUser() {
      const AuthStr = 'Bearer '.concat(
        (this as any).getSpotifyAuth.accessToken
      );
      axios
        .get('https://api.spotify.com/v1/me', {
          headers: {
            Authorization: AuthStr
          }
        })
        .then(response => response.data)
        .then(data => {
          let image = null;
          if (data.images.length > 0) {
            image = data.images[0].url;
          }

          const user = {
            displayName: data.display_name,
            image
          };

          this.$data.spotifyUser = user;
        });
    }
  }
});
</script>
