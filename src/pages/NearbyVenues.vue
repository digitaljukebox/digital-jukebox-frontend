<template>
  <div>
    <q-tabs v-model="tab">
      <q-tab name="list" icon="fas fa-list" />
      <q-tab name="map" icon="fas fa-map" />
    </q-tabs>

    <div v-if="tab == 'list'">
      <q-list bordered separator>
        <q-item
          clickable
          @click="navigateToInfoPage(venue.id)"
          v-ripple
          v-for="venue in venues"
          :key="venue.id"
        >
          <q-item-section>
            <q-item-label>{{ venue.name }}</q-item-label>
            <q-item-label caption>{{
              getVenueDistance(venue.location)
            }}</q-item-label>
          </q-item-section>
          <q-item-section avatar>
            <q-icon name="fas fa-chevron-right" />
          </q-item-section>
        </q-item>
      </q-list>
    </div>

    <div v-if="tab == 'map'">
      Map
    </div>
  </div>
</template>

<style scoped></style>

<script>
import { NCoordinates, Venue, venueFromFirestoreDocument } from 'src/types.ts';
import firebase from 'firebase';
import 'firebase/firestore';
const db = firebase.firestore();

export default {
  name: 'NearbyVenues',
  data() {
    const d = {
      tab: 'list',
      venues: [],
      userLocation: null
    };

    return d;
  },
  methods: {
    updateVenues() {
      // send the users location to the server to get an updated list of venues and distances
      this.venues = [];
      db.collection('venues').onSnapshot(querySnapshot => {
        this.venues = [];

        querySnapshot.forEach(doc =>
          this.venues.push(venueFromFirestoreDocument(doc))
        );

        this.venues.sort((a, b) => {
          let distA = this.userLocation.distanceTo(a.location);
          let distB = this.userLocation.distanceTo(b.location);
          return distA - distB;
        });
      });
    },
    getUserLocation() {
      navigator.geolocation.getCurrentPosition(position => {
        this.userLocation = new NCoordinates(
          position.coords.latitude,
          position.coords.longitude
        );
      });
    },
    getVenueDistance: function(venueLocation) {
      if (this.userLocation) {
        const distance = this.userLocation.distanceTo(venueLocation);
        let units = 'km';
        if (distance < 1) {
          units = 'm';
        }
        return `${distance.toFixed(2)}${units}`;
      } else {
        return '????';
      }
    },
    navigateToInfoPage(venueId) {
      this.$router.push(`/venue/${venueId}`);
    }
  },
  mounted() {
    this.getUserLocation();

    this.updateVenues();
    setInterval(this.updateVenues, 30000);
  }
};
</script>
