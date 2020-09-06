<template>
  <div>
    <div v-if="!loading && venue">
      <q-img :src="venue.photoURL" spinner-color="white" />
      <h4 class="text">{{ venue.name }}</h4>

      <p>
        <autocomplete :search="searchSong" debounceTime="300"></autocomplete>
      </p>
      <q-list bordered>
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-avatar rounded>
              <img src="https://cdn.quasar.dev/img/mountains.jpg" />
            </q-avatar>
          </q-item-section>
          <q-item-section>List item</q-item-section>
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

<script lang="ts">
import Error404 from '../Error404.vue';
import Autocomplete from '@trevoreyre/autocomplete-vue';
import '@trevoreyre/autocomplete-vue/dist/style.css';

export default {
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
  methods: {
    searchSong(input) {
      return [];
    }
  },
  mounted() {
    const venueId = this.$route.params.id;
    const db = this.$fb.getFirestore();
    const docRef = db.collection('venues').doc(venueId);

    let _this = this;
    docRef
      .get()
      .then(function(doc: firebase.firestore.DocumentSnapshot) {
        if (doc.exists) {
          console.log('Document data:', doc.data());
          _this.venue = doc.data();
          _this.loading = false;
        } else {
          // doc.data() will be undefined in this case. this will render a 404 error
          console.log('No such document!');
          _this.loading = false;
        }
      })
      .catch(function(error: Error) {
        console.log('Error getting document:', error);
      });
  }
};
</script>
