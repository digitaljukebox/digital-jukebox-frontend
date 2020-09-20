<template>
  <q-page padding>
    <div class="text-h3 q-my-lg">
      {{ venue.name }}
    </div>

    <allow-deny-list></allow-deny-list>

  </q-page>
</template>

<script>
import firebase from 'firebase';
import 'firebase/firestore';
const db = firebase.firestore();
import draggable from 'vuedraggable';
import AllowDenyList from '../../components/AllowDenyList';

export default {
  name: 'VenueDetails',
  components: {
    draggable, AllowDenyList
  },
  data() {
    return {
      venueId: null,
      venue: {
        name: null
      }
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
