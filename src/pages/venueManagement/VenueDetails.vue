<template>
  <q-page padding>
    <div class="text-h3 q-my-lg">
      {{ venue.name }}
    </div>

    <div class="text-h6">Daily Metrics</div>
    <div class="row q-mb-lg">
      <q-chip square>
        <q-avatar color="secondary" text-color="white">50</q-avatar>
        User Check-Ins
      </q-chip>
      <q-chip square>
        <q-avatar color="secondary" text-color="white">50</q-avatar>
        Venue Views
      </q-chip>
      <q-chip square>
        <q-avatar color="secondary" text-color="white">50</q-avatar>
        Song Requests
      </q-chip>
    </div>

    <q-card style="max-width: 500px;">
      <q-card-section horizontal>
        <q-img
          class="col-5"
          src="https://cdn.quasar.dev/img/parallax1.jpg"
          :ratio="1"
        />

        <q-card-section
          style="justify-content: space-between;display: flex;flex-direction: column;"
        >
          <div>
            <div class="text-h4">Song Name</div>
            <div class="text-h5">Artist Name</div>
            <div class="text-subtitle1">Request By: Aidan K.</div>
          </div>

          <q-card-actions>
            <q-btn flat round color="primary" icon="fas fa-pause" />
            <q-btn flat round color="negative" icon="fas fa-forward" />
          </q-card-actions>
        </q-card-section>
      </q-card-section>
      <q-card-section style="padding: 0">
        <q-linear-progress size="25px" :value="0.15" color="primary">
          <div class="absolute-full flex flex-center">
            <q-badge color="white" text-color="primary" label="2:01 mins" />
          </div>
        </q-linear-progress>
      </q-card-section>
    </q-card>

    <div class="q-my-md" style="max-width: 500px;">
      <q-toolbar class="bg-primary text-white">
        <q-toolbar-title>Upcoming Songs</q-toolbar-title>
        <q-btn flat round><q-icon name="fas fa-plus"/></q-btn>
      </q-toolbar>
      <q-list bordered>
        <draggable v-model="myArray" @start="drag = true" @end="drag = false">
          <q-item v-for="element in myArray" :key="element.id">
            <q-item-section avatar>
              <q-avatar>
                <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ element.name }}</q-item-label>
              <q-item-label caption lines="1">Artist Name</q-item-label>
              <q-item-label caption lines="1">2:56</q-item-label>
            </q-item-section>

            <q-item-section>
              <q-item-label caption>Submitted By Aidan K.</q-item-label>
            </q-item-section>

            <q-item-section side>
              <div class="row items-center q-gutter-sm">
                <q-btn flat round color="negative" icon="fas fa-minus-circle" />
                <q-icon name="fas fa-grip-lines" size="sm" color="grey-5" />
              </div>
            </q-item-section>
          </q-item>
        </draggable>
      </q-list>
    </div>

    <div class="row q-gutter-sm">
      <q-btn
        color="primary"
        label="Edit Venue Details"
        @click="navigateToEditPage"
      />
      <q-btn
        color="primary"
        label="Venue Metrics"
        @click="navigateToDashboardPage"
      />
    </div>
  </q-page>
</template>

<script>
import firebase from 'firebase';
import 'firebase/firestore';
const db = firebase.firestore();
import draggable from 'vuedraggable';

export default {
  name: 'VenueDetails',
  components: {
    draggable
  },
  data() {
    return {
      venueId: null,
      venue: {
        name: null
      },
      myArray: [
        { id: 1, name: 'hi' },
        { id: 2, name: 'hello' }
      ]
    };
  },
  mounted() {
    this.venueId = this.$route.params.id;
    db.collection('venues')
      .doc(this.venueId)
      .get()
      .then(doc => {
        let data = doc.data();
        console.log(data);
        this.venue = { ...data, location: { ...data.location } };

        this.center = {
          lat: data.location.latitude,
          lng: data.location.longitude
        };
      });
  },
  methods: {
    navigateToEditPage() {
      this.$router.push(`/manage-venues/${this.venueId}/edit`);
    },
    navigateToDashboardPage() {
      this.$router.push(`/manage-venues/dashboard/${this.venueId}`);
    }
  }
};
</script>
