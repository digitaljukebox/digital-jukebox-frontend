<template>
  <div>
    <div v-if="!loading && venue" class="q-pa-md">
      <h4 class="text">{{ venue.name }}</h4>

      <q-banner v-if="!spotifyLoggedIn" rounded class="bg-warning q-my-md">
        Sorry, but you need to link your Spotify account before you can use this page. <router-link :to="{name: 'profile'}">Click here</router-link> to link your Spotify account.
      </q-banner>

      <p>
        <autocomplete
          :disabled="!spotifyLoggedIn"
          :search="searchSong"
          :debounceTime="300"
          @submit="addToQueue"
        >
          <template #result="{ result }">
            <q-item clickable v-ripple @click="addToQueue(result)">
              <q-item-section avatar>
                <q-avatar>
                  <img :src="result.album.images[0].url" />
                </q-avatar>
              </q-item-section>
              <q-item-section
              >{{ result.name }} {{ result.artists[0].name }}
              </q-item-section
              >
            </q-item>
          </template>
        </autocomplete>
      </p>
      <q-list bordered>
        <q-item clickable v-ripple v-for="song in songQueue" :key="song.name">
          <q-item-section avatar>
            <q-avatar>
              <img :src="song.album.images[0].url" />
            </q-avatar>
          </q-item-section>
          <q-item-section
          >{{ song.name }} {{ song.artists[0].name }}
          </q-item-section
          >
        </q-item>
      </q-list>
    </div>
    <div v-else-if="!loading && !venue">
      <error404></error404>
    </div>
  </div>
</template>

<style scoped>
.text {
  text-align: center;
}
</style>

<script lang="js">
import Vue from 'vue';
import { defineComponent } from '@vue/composition-api';
import Error404 from '../Error404.vue';
import axios from 'axios';
import { v4 } from 'uuid';
import { Notify } from 'quasar';
import {spotifyApi} from '@services/firebase/spotify';
const db = firebase.firestore();

// eslint-disable-next-line @typescript-eslint/no-var-requires
import firebase, { UserInfo } from 'firebase';
import Autocomplete from '@trevoreyre/autocomplete-vue';
import '@trevoreyre/autocomplete-vue/dist/style.css';

Vue.use(Autocomplete);

export default defineComponent({
  name: 'VenueInfo',
  components: {
    Error404,
    Autocomplete
  },
  data() {
    return {
      user: {},
      userProfile: {},
      userProfileRef: {},
      loading: true,
      venue: null,
      songQueue: [],
      song: null,
      songSuggestions: []
    };
  },
  computed: {
    spotifyLoggedIn() {
      return !!this.userProfile.spotify.accessToken;
    }
  },
  methods: {
    searchSong(input) {
      if (input === '') {
        return [];
      }

      const url = new URL('https://api.spotify.com/v1/search');
      url.searchParams.append('q', input);
      url.searchParams.append('type', 'track');

      const AuthStr = 'Bearer '.concat(this.userProfile.spotify.accessToken);
      return axios
        .get(url.toString(), {
          headers: {
            Authorization: AuthStr
          }
        })
        .then(response => response.data)
        .then(data => {
          return data.tracks.items;
        });
    },
    addToQueue(result) {
      firebase.auth().onAuthStateChanged(async user => {
        let firebaseUser;
        if (user) {
          firebaseUser = { ...user };
        }

        if (firebaseUser) {
          console.log(this.venue);
          await db.collection('venues')
            .doc(this.$route.params.id)
            .update({queuedTracks: firebase.firestore.FieldValue.arrayUnion(result)});
            Notify.create(result.name + ' added to the queue!');
        } else {
          Notify.create(result.name + ' could not be added to the queue due to an error.');
        }
      });
    }
  },
  mounted() {
    const venueId = this.$route.params.id;
    const db = this.$fb.getFirestore();
    const docRef = db.collection('venues').doc(venueId);

    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.log('Document data:', doc.data());
          this.venue = doc.data();
          this.loading = false;
        } else {
          // doc.data() will be undefined in this case. this will render a 404 error
          console.log('No such document!');
          this.loading = false;
        }
      })
      .catch(function(error) {
        console.log('Error getting document:', error);
      });

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        let checkIn = {
          venueId,
          userId: user.uid,
          timeStamp: new Date()
        };
        db.collection('venuecheckins').doc(`${v4()}`).set(checkIn);
      }
    });
  },
  async created() {
    const db = this.$fb.getFirestore();

    firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        this.user = user;
        this.userProfileRef = db.collection('users').doc(user.uid);

        this.userProfileRef
          .onSnapshot(doc => {
            this.userProfile = doc.data();
          });
      }
    });
  }
});
</script>
