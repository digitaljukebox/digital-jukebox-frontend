<template>
  <q-page padding>
    <div class="text-h3 q-my-lg">
      {{ venue.name }}
    </div>

    <div class="text-h5 q-py-sm">Metrics From Today</div>
    <div class="row q-mb-lg">
      <q-chip square>
        <q-avatar color="secondary" text-color="white">{{metrics.checkins}}</q-avatar>
        User Check-Ins
      </q-chip>
      <q-chip square>
        <q-avatar color="secondary" text-color="white">{{metrics.views}}</q-avatar>
        Venue Views
      </q-chip>
<!--      <q-chip square>-->
<!--        <q-avatar color="secondary" text-color="white">50</q-avatar>-->
<!--        Song Requests-->
<!--      </q-chip>-->
    </div>

    <div class="text-h5 q-py-sm">Playback Controls</div>
    <q-card style="max-width: 500px;">
      <q-card-section horizontal>
        <q-img
          class="col-5"
          src="https://i.scdn.co/image/ab67616d0000b273f619042d5f6b2149a4f5e0ca"
          :ratio="1"
        />

        <q-card-section
          style="justify-content: space-between;display: flex;flex-direction: column;"
        >
          <div>
            <div class="text-h4">Firework</div>
            <div class="text-h5">Katy Perry</div>
            <div class="text-subtitle1">Requested By: Jaimyn M.</div>
          </div>

          <q-card-actions>
            <q-btn @click="track.playing = ! track.playing" flat round color="primary" :icon="track.playing ? 'fas fa-pause' : 'fas fa-play'" />
            <q-btn @click="track.played = 0" flat round color="primary" icon="fas fa-forward" />
          </q-card-actions>
        </q-card-section>
      </q-card-section>
      <q-card-section style="padding: 0">
        <q-linear-progress size="25px" :value="track.played/track.length" color="primary">
          <div class="absolute-full flex flex-center">
            <q-badge color="white" text-color="primary" :label="trackLength" />
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
        <draggable v-model="queuedTracks" @start="drag = true" @end="drag = false">
          <q-item v-for="track in queuedTracks" :key="track.name">
            <q-item-section avatar>
              <q-avatar>
                <img :src="track.album.images[0].url" />
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ track.name }}</q-item-label>
              <q-item-label caption lines="1">{{ track.artists[0].name }}</q-item-label>
              <q-item-label caption lines="1">{{trackLengthFormat(track.duration_ms / 1000)}}</q-item-label>
            </q-item-section>

            <q-item-section side>
              <div class="row items-center q-gutter-sm">
                <q-btn @click="removeTrack(track)" flat round color="negative" icon="fas fa-minus-circle" />
                <q-icon name="fas fa-grip-lines" size="sm" color="grey-5" />
              </div>
            </q-item-section>
          </q-item>
        </draggable>
      </q-list>
    </div>

    <div class="text-h5 q-py-sm">Manage Venue</div>
    <div class="row q-gutter-sm">
      <q-btn
        color="primary"
        label="Edit Venue"
        @click="navigateToEditPage"
      />
      <q-btn
        color="primary"
        label="Metrics"
        @click="navigateToDashboardPage"
      />
      <q-btn
        color="primary"
        label="Allow/Deny List"
        :to="{name: 'Allow/Deny List'}"
      />
    </div>
  </q-page>
</template>

<script>
import firebase from 'firebase';
import 'firebase/firestore';
const db = firebase.firestore();
import draggable from 'vuedraggable';
import {trackLengthFormat} from '../../services/filters';

export default {
  name: 'VenueDetails',
  components: {
    draggable
  },
  data() {
    return {
      user: {},
      venueId: null,
      venue: {
        name: null
      },
      track: {
        length: 228,
        played: 12,
        playing: true,
      },
      metrics: {
        views: 0,
        checkins: 0,
      },
    };
  },
  mounted() {
    setInterval(() => {
      if (this.track.playing) this.track.played++;
      if (this.track.played >= this.track.length) this.track.played = 0;
    }, 1000);
    this.venueId = this.$route.params.id;
    db.collection('venues')
      .doc(this.venueId)
      .onSnapshot(doc => {
        let data = doc.data();
        this.venue = { ...data, location: { ...data.location } };

        this.center = {
          lat: data.location.latitude,
          lng: data.location.longitude
        };
      });

    let date = new Date(firebase.firestore.Timestamp.now().toMillis() - (24*60*60*1000))
    db.collection('venueprofileviews').where('venueId', '==', this.venueId).where('timestamp', '>', date)
      .onSnapshot((views) => {
        this.metrics.views = views.size;
      });
    db.collection('venuecheckins').where('venueId', '==', this.venueId).where('timestamp', '>', date)
      .onSnapshot((checkins) => {
        this.metrics.checkins = checkins.size;
      });
  },
  computed: {
    queuedTracks() {
      console.log(this.venue.queuedTracks);
      return this.venue.queuedTracks || [];
    },
    trackLength() {
      return trackLengthFormat(this.track.played * 1000) + ' / ' + trackLengthFormat(this.track.length * 1000);
    },
  },
  methods: {
    removeTrack(track) {
      firebase.auth().onAuthStateChanged(async user => {
        if (user) {
          let firebaseUser = { ...user };

          if (firebaseUser) {
            await db.collection('venues')
              .doc(this.venueId)
              .update({ queuedTracks: firebase.firestore.FieldValue.arrayRemove(track) });
          }
        }
      });
    },
    trackLengthFormat(value) {
      return trackLengthFormat(value*1000);
    },
    navigateToEditPage() {
      this.$router.push(`/manage-venues/${this.venueId}/edit`);
    },
    navigateToDashboardPage() {
      this.$router.push(`/manage-venues/dashboard/${this.venueId}`);
    }
  },
};
</script>
