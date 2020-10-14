<template>
  <div class="small-width" style="margin: auto;">
    <q-tabs v-model="tab">
      <q-tab name="list" icon="fas fa-list" />
      <q-tab name="map" icon="fas fa-map" />
    </q-tabs>

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="list">
        <q-list separator>
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
      </q-tab-panel>

      <q-tab-panel name="map">
        <l-map
          style="height: 90vh; width: 90vw; margin: 0 auto;"
          :zoom="zoom"
          :center="center"
        >
          <l-tile-layer :url="mapDataUrl"></l-tile-layer>
          <l-marker
            :lat-lng="[venue.location.latitude, venue.location.longitude]"
            v-for="venue in venues"
            :key="venue.id"
          >
            <l-popup>
              <div class="text-h6">{{ venue.name }}</div>
              <div class="text-subtitle2">{{ venue.address }}</div>

              <q-separator />

              <q-btn flat @click="navigateToInfoPage(venue.id)">View</q-btn>
            </l-popup>
          </l-marker>
        </l-map>
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<style scoped></style>

<script lang="ts">
import { NCoordinates, Venue, venueFromFirestoreDocument } from 'src/types.ts';
import firebase from 'firebase';
import L from 'leaflet';
import { LMap, LTileLayer, LMarker, LPopup } from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';
import 'firebase/firestore';
const db = firebase.firestore();

import { Icon } from 'leaflet';

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

type D = Icon.Default & {
  _getIconUrl?: string;
};

delete (Icon.Default.prototype as D)._getIconUrl;

export default {
  name: 'NearbyVenues',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup
  },
  data() {
    const d: {
      tab: string;
      venues: Venue[];
      userLocation: NCoordinates;
      mapDataUrl: string;
      zoom: number;
      center: number[];
    } = {
      tab: 'list',
      venues: [],
      userLocation: null,
      mapDataUrl: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      zoom: 10,
      center: [-27, 152]
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
          let distA: number = (this as any).userLocation?.distanceTo(
            a.location
          );
          let distB: number = (this as any).userLocation?.distanceTo(
            b.location
          );
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
        (this as any).center = [
          position.coords.latitude,
          position.coords.longitude
        ];
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
