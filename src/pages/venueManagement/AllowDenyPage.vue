<template>
  <q-page padding>
    <div class="text-h3 q-my-lg">
      {{ venue.name }}
    </div>

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
              <q-item-label caption lines="1">2:56 mins</q-item-label>
            </q-item-section>

            <q-item-section>
              <q-item-label caption>Requested By: Aidan K.</q-item-label>
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
