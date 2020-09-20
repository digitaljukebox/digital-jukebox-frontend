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

<script lang="ts">
import { NCoordinates, Venue, venueFromFirestoreDocument } from 'src/types.ts';
import firebase from 'firebase';
import 'firebase/firestore';
const db = firebase.firestore();

export default {
  name: 'NearbyVenues',
  data() {
    const d: {
      tab: string;
      venues: Venue[];
      userLocation: NCoordinates;
    } = {
      tab: 'list',
      venues: [],
      userLocation: null
    };

    return d;
  },
  methods: {
    updateVenues() {
      // send the users location to the server to get an updated list of venues and distances
      (this as any).venues = [];
      db.collection('venues').onSnapshot(querySnapshot => {
        (this as any).venues = [];

        querySnapshot.forEach(doc =>
          (this as any).venues.push(venueFromFirestoreDocument(doc))
        );

        (this as any).venues.sort((a: Venue, b: Venue) => {
          let distA: number = (this as any).userLocation.distanceTo(a.location);
          let distB: number = (this as any).userLocation.distanceTo(b.location);
          return distA - distB;
        });
      });
    },
    getUserLocation() {
      navigator.geolocation.getCurrentPosition(position => {
        (this as any).userLocation = new NCoordinates(
          position.coords.latitude,
          position.coords.longitude
        );
      });
    },
    getVenueDistance: function(venueLocation: NCoordinates): string {
      if ((this as any).userLocation) {
        const distance: number = (this as any).userLocation.distanceTo(
          venueLocation
        );
        let units = 'km';
        if (distance < 1) {
          units = 'm';
        }
        return `${distance.toFixed(2)}${units}`;
      } else {
        return '????';
      }
    },
    navigateToInfoPage(venueId: string) {
      (this as any).$router.push(`/venue/${venueId}`);
    }
  },
  mounted() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    (this as any).getUserLocation();

    (this as any).updateVenues();
    setInterval((this as any).updateVenues, 30000);
  }
};
</script>
