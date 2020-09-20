<template>
  <div>
    <div v-if="!loading && venue">
      <q-img :src="venue.photoURL" spinner-color="white" />
      <h4 class="text">{{ venue.name }}</h4>
      <p class="text">{{ venue.description }}</p>
      <p class="text">Address: {{ venue.address }}</p>
      <p class="text" style="padding-top:15px" v-if="isSpotifyLogin">
        <q-btn
          @click="navigateToQueuePage()"
          color="white"
          text-color="black"
          label="View Queue"
        />
      </p>
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
import { VenueProfileView } from 'src/types.ts';
import { defineComponent, ref } from '@vue/composition-api';
import firebase from 'firebase';
import Error404 from './Error404.vue';
import { mapGetters } from 'vuex';
import { v4 } from 'uuid';
const db = firebase.firestore();

export default defineComponent({
  name: 'VenueInfo',
  components: {
    Error404
  },
  data() {
    return {
      loading: true,
      venue: null,
      venueId: null
    };
  },
  methods: {
    navigateToQueuePage() {
      this.$router.push(`/venue/${this.venueId}/queue`);
    },
    initVenue() {
      const docRef = db.collection('venues').doc(this.venueId);
      let _this = this;
      docRef
        .get()
        .then(function(doc: firebase.firestore.DocumentSnapshot) {
          if (doc.exists) {
            console.log('Document data:', doc.data());
            _this.venue = doc.data();
            _this.loading = false;
            _this.logProfileView();
          } else {
            // doc.data() will be undefined in this case. this will render a 404 error
            console.log('No such document!');
            _this.loading = false;
          }
        })
        .catch(function(error: Error) {
          console.log('Error getting document:', error);
        });
    },
    logProfileView() {
      let _this = this;
      console.log(_this.venue)
      firebase.auth().onAuthStateChanged(function(user) {
        let view: VenueProfileView;
        if (user) {
          // User is signed in.
          view = {
            venueId: _this.venueId,
            userId: user.uid,
            timestamp: new Date(),
          };
          console.log(view);
        } else {
          // No user is signed in.
          view = {
            venueId: _this.venueId,
            userId: '',
            timestamp: new Date(),
          }
        }
        db.collection('venueprofileviews')
          .doc(`${v4()}`)
          .set(view)
      });
    }
  },
  computed: {
    ...mapGetters('spotify', ['isSpotifyLogin'])
  },
  mounted() {
    this.venueId = this.$route.params.id;
    this.initVenue();
  }
    
});
</script>
