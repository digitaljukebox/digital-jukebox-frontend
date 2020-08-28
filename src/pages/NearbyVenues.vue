<template>
  <div>
    <q-tabs v-model="tab">
      <q-tab name="list" icon="list"/>
      <q-tab name="map" icon="map"/>
    </q-tabs>

    <div v-if="tab == 'list'">
      <q-list bordered separator>
        <q-item clickable v-ripple v-for="venue in venues" :key=venue.id>
          <q-item-section>
            <q-item-label>{{ venue.name }}</q-item-label>
            <q-item-label caption>{{ venue.distanceTo }}</q-item-label>
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
export default {
  name: 'NearbyVenues',
  data() {
    const d: { 
      tab: string,
      venues: Venue[],
    } = { 
      tab: 'list',
      venues: [],
    };

    return d;
  },
  methods: {
    updateVenues() {
      // send the users location to the server to get an updated list of venues and distances
      // TODO
      this.venues = [];
    },
    getUserLocation() {
      navigator.geolocation.getCurrentPosition(function(position) {
        console.log(position);
      })
    }
  },
  mounted() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    this.getUserLocation();
    // setInterval(this.updateVenues, 30000);
  }
}
</script>