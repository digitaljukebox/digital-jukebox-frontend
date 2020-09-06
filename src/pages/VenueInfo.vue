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
import { defineComponent, ref } from '@vue/composition-api';
import Error404 from './Error404.vue';
import { mapGetters } from 'vuex';

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
    }
  },
  computed: {
    ...mapGetters('spotify', ['isSpotifyLogin'])
  },
  mounted() {
    const venueId = this.$route.params.id;
    const db = this.$fb.getFirestore();
    const docRef = db.collection('venues').doc(venueId);
    this.venueId = venueId;
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
});
</script>
