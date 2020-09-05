<template>
  <div>
    <q-tabs v-model="tab">
      <q-tab name="list" icon="list"/>
      <q-tab name="map" icon="map"/>
    </q-tabs>

    <div v-if="tab == 'list'">
      <q-list bordered separator>
        <q-item clickable @click="navigateToInfoPage(venue.id)" v-ripple v-for="venue in venues" :key=venue.id>
          <q-item-section>
            <q-item-label>{{ venue.name }}</q-item-label>
            <q-item-label caption>{{ getVenueDistance(venue.location) }}</q-item-label>
          </q-item-section>
          <q-icon name="chevron_right"/>
        </q-item>
      </q-list>
    </div>

    <div v-if="tab == 'map'">
      Map
    </div>
  </div>
</template>

<style scoped>

</style>

<script lang="ts">
import {NCoordinates, Venue, venueFromFirestoreDocument} from 'src/types.ts'

export default {
  name: 'NearbyVenues',
  data() {
    const d: { 
      tab: string,
      venues: Venue[],
      userLocation: NCoordinates,
    } = { 
      tab: 'list',
      venues: [],
      userLocation: null,
    };

    return d;
  },
  methods: {
    updateVenues() {
      // send the users location to the server to get an updated list of venues and distances
      this.venues = [];
      const db = this.$fb.getFirestore();
      db.collection("venues").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.venues.push(venueFromFirestoreDocument(doc));
        });

        this.venues.sort(function(a: Venue, b: Venue) {
          let distA: number = this.userLocation.distanceTo(a.location);
          let distB: number = this.userLocation.distanceTo(b.location);
          return distA - distB;
        })
      });
      
      

    },
    getUserLocation() {
      let _this = this;
      navigator.geolocation.getCurrentPosition(function(position) {
        _this.userLocation = new NCoordinates(position.coords.latitude, position.coords.longitude);
        
      })
    },
    getVenueDistance: function(venueLocation: NCoordinates): string {
      if (this.userLocation) {
        const distance :number = this.userLocation.distanceTo(venueLocation);
        let units = 'km';
        if (distance < 1) {
          units = 'm';
        }
        return `${distance.toFixed(2)}${units}`;
      } else {
        return '????';
      }
    },
    navigateToInfoPage(venueId: number) {
      this.$router.push(`/venue/${venueId}`);
    }
  },
  mounted() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    this.getUserLocation();

    this.updateVenues();
    setInterval(this.updateVenues, 30000);
  }
}
</script>