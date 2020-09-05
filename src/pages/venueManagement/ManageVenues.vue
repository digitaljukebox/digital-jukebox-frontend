<template>
  <q-page padding>
    <div class="row justify-center"><h4>Your Venues</h4></div>
    <div class="row justify-center">
      <q-list bordered separator style="max-width: 500px; flex:1">
        <q-item
          clickable
          v-ripple
          v-for="venue in venues"
          :key="venue.id"
          @click="navigateToEditPage(venue.id)"
        >
          <q-item-section>
            <q-item-label>{{ venue.name }}</q-item-label>
          </q-item-section>
          <q-item-section avatar>
            <q-icon name="fas fa-chevron-right" />
          </q-item-section>
        </q-item>
      </q-list>
    </div>
    <div class="row justify-center">
      <q-btn
        label="Create new venue"
        to="/manage-venues/create"
        class="q-mt-lg"
        color="primary"
      />
    </div>
  </q-page>
</template>

<script>
import firebase from 'firebase';
import 'firebase/firestore';
const db = firebase.firestore();

export default {
  name: 'ManageVenues',
  data() {
    return {
      venues: []
    };
  },
  async created() {
    firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        db.collection('venues')
          .where('manager', '==', user.uid)
          .onSnapshot(querySnapshot => {
            this.venues = [];
            querySnapshot.forEach(doc =>
              this.venues.push({ ...doc.data(), id: doc.id })
            );
          });
      }
    });
  },
  methods: {
    navigateToEditPage(venueId) {
      this.$router.push(`/manage-venues/${venueId}`);
    }
  }
};
</script>
