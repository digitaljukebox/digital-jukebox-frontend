<template>
  <div>
    <div v-if="!loading && venue">
      <h4 class="text">{{ venue.name }}</h4>

      <p>
        <autocomplete
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
                >{{ result.name }} {{ result.artists[0].name }}</q-item-section
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
            >{{ song.name }} {{ song.artists[0].name }}</q-item-section
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

<script>
import { defineComponent } from '@vue/composition-api';
import Error404 from '../Error404.vue';
import Autocomplete from '@trevoreyre/autocomplete-vue';
import '@trevoreyre/autocomplete-vue/dist/style.css';
import axios from 'axios';
import { Notify } from 'quasar';
import { mapGetters } from 'vuex';

export default defineComponent({
  name: 'VenueInfo',
  components: {
    Error404,
    Autocomplete
  },
  data() {
    return {
      loading: true,
      venue: null,
      songQueue: [],
      song: null,
      songSuggestions: []
    };
  },
  computed: {
    ...mapGetters('spotify', ['isSpotifyLogin', 'getSpotifyAuth'])
  },
  methods: {
    searchSong(input) {
      if (input === '') {
        return [];
      }

      const url = new URL('https://api.spotify.com/v1/search');
      url.searchParams.append('q', input);
      url.searchParams.append('type', 'track');

      const AuthStr = 'Bearer '.concat(this.getSpotifyAuth.accessToken);
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
      this.$data.songQueue.push(result);
      Notify.create(result.name + ' added to the queue!');
    }
  },
  mounted() {
    const venueId = this.$route.params.id;
    const db = this.$fb.getFirestore();
    const docRef = db.collection('venues').doc(venueId);

    docRef
      .get()
      .then(doc => {
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
  }
});
</script>
