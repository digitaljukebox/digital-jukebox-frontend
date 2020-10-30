<template>
  <q-page padding>
    <template v-if="venue">
      <div class="text-h3 q-my-lg">
        {{ venue.name }}
      </div>

      <q-banner v-if="!spotifyLoggedIn" rounded class="bg-warning q-my-md">
        Sorry, but you need to link your Spotify account before you can use this
        page. <router-link to="/profile">Click here</router-link> to link your
        Spotify account.
      </q-banner>

      <q-card style="max-width: 500px; margin-bottom: 50px">
        <q-card-section horizontal>
          <q-img
            class="col-5"
            src="https://i.scdn.co/image/ab67616d0000b273f619042d5f6b2149a4f5e0ca"
            :ratio="1"
          />

          <q-card-section
            style="justify-content: space-between;display: flex;flex-direction: column;"
          >
            <div>
              <div class="text-h4">Firework</div>
              <div class="text-h5">Katy Perry</div>
              <div class="text-subtitle1">Requested By: Jaimyn M.</div>
            </div>
          </q-card-section>
        </q-card-section>
        <q-card-section style="padding: 0">
          <q-linear-progress
            size="25px"
            :value="track.played / track.length"
            color="primary"
          >
            <div class="absolute-full flex flex-center">
              <q-badge
                color="white"
                text-color="primary"
                :label="trackLength"
              />
            </div>
          </q-linear-progress>
        </q-card-section>
      </q-card>

      <autocomplete
        :disabled="!spotifyLoggedIn"
        :search="searchSong"
        :debounceTime="300"
        @submit="addToQueue"
        placeholder="Add a Song to the Queue"
        id="song-search"
      >
        <template #result="{ result }">
          <q-item clickable v-ripple @click="addToQueue(result)">
            <q-item-section avatar>
              <q-avatar>
                <img :src="result.album.images[0].url" />
              </q-avatar>
            </q-item-section>
            <q-item-section
              >{{ result.name }} - {{ result.artists[0].name }}
            </q-item-section>
          </q-item>
        </template>
      </autocomplete>

      <div class="q-my-md" style="max-width: 500px;">
        <q-toolbar class="bg-primary text-white">
          <q-toolbar-title>Upcoming Songs</q-toolbar-title>
        </q-toolbar>
        <q-list bordered separator>
          <q-item v-for="track in queuedTracks" :key="track.name">
            <q-item-section avatar>
              <q-avatar>
                <img :src="track.album.images[0].url" />
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ track.name }}</q-item-label>
              <q-item-label caption lines="1">{{
                track.artists[0].name
              }}</q-item-label>
              <q-item-label caption lines="1">{{
                trackLengthFormat(track.duration_ms / 1000)
              }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </template>
  </q-page>
</template>

<style scoped>
.text {
  text-align: center;
}
</style>

<style>
.autocomplete-input {
  max-width: 500px;
}

.autocomplete-result-list {
  border-top-color: rgba(0, 0, 0, 0.12) !important;
  max-width: 500px;
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
import draggable from 'vuedraggable';

// eslint-disable-next-line @typescript-eslint/no-var-requires
import firebase, { UserInfo } from 'firebase';
import Autocomplete from '@trevoreyre/autocomplete-vue';
import '@trevoreyre/autocomplete-vue/dist/style.css';
import { trackLengthFormat } from '../../services/filters';

Vue.use(Autocomplete);

export default defineComponent({
  name: 'VenueInfo',
  components: {
    Error404,
    Autocomplete,
    draggable
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
      songSuggestions: [],
      track: {
        length: 228,
        played: 12,
        playing: true
      },
    };
  },
  computed: {
    spotifyLoggedIn() {
      if (!this.userProfile.spotify) {
        return false;
      }
      return !!this.userProfile.spotify.accessToken;
    },
    queuedTracks() {
      return this.venue.queuedTracks || [];
    },
    trackLength() {
      return (
        trackLengthFormat(this.track.played * 1000) +
        ' / ' +
        trackLengthFormat(this.track.length * 1000)
      );
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

        } else {
          Notify.create(result.name + ' could not be added to the queue due to an error.');
        }
      });
    },
    removeTrack(track) {
      firebase.auth().onAuthStateChanged(async user => {
        if (user) {
          let firebaseUser = { ...user };

          if (firebaseUser) {
            await db
              .collection('venues')
              .doc(this.venueId)
              .update({
                queuedTracks: firebase.firestore.FieldValue.arrayRemove(track)
              });
          }
        }
      });
    },
    trackLengthFormat(value) {
      return trackLengthFormat(value * 1000);
    },
  },
  mounted() {

    setInterval(() => {
      if (this.track.playing) this.track.played++;
      if (this.track.played >= this.track.length) this.track.played = 0;
    }, 1000);

    const venueId = this.$route.params.id;
    const db = this.$fb.getFirestore();

    db.collection('venues')
      .doc(venueId)
      .onSnapshot(doc => {
        let data = doc.data();
        this.venue = { ...data, location: { ...data.location } };

        this.center = {
          lat: data.location.latitude,
          lng: data.location.longitude
        };
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
