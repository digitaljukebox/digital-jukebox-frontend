<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="fas fa-bars"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
        <q-toolbar-title>
          Digital Jukebox
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <template v-if="user">
        <q-list>
          <EssentialLink
            v-for="link in essentialLinks"
            :key="link.title"
            v-bind="link"
          />
        </q-list>
        <div class="row justify-center q-mt-lg">
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
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import EssentialLink from 'components/EssentialLink.vue';

const linksData = [
  {
    title: 'Home',
    icon: 'fas fa-home',
    link: '/'
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
  }
];

import { defineComponent, ref } from '@vue/composition-api';
import firebase from 'firebase';

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
      user: null
    };
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user;
      }
    });
  },
  methods: {
    signOut(e) {
      e.stopPropagation();
      firebase.auth().signOut();
      this.$router.push('/login');
    }
  }
});
</script>
