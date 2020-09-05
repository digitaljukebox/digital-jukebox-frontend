<template>
  <div>
    <div v-if="!loading && venue">
      <q-img
        :src="venue.photoUrl"
        spinner-color="white"
      />
      <h4 class="text">{{ venue.name }}</h4>
      <p class="text">{{ venue.description }}</p>
      <p class="text">Address: {{ venue.address }}</p>
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
import Error404 from './Error404.vue';

export default {
  name: 'VenueInfo',
  components: {
    Error404,
  },
  data() {
    return {
      loading: true,
      venue: null,
    }
  },
  mounted() {
    const venueId = this.$route.params.id;
    const db = this.$fb.getFirestore();
    const docRef = db.collection("venues").doc(venueId);

    let _this = this;
    docRef.get().then(function(doc: firebase.firestore.DocumentSnapshot) {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        _this.venue = doc.data();
        _this.loading = false;
      } else {
        // doc.data() will be undefined in this case. this will render a 404 error
        console.log("No such document!");
        _this.loading = false;

      }
    }).catch(function(error: Error) {
      console.log("Error getting document:", error);
    });
  }
}
</script>