<template>
  <q-page padding>
    <div class="row justify-center">
      <q-img
        v-if="user.photoURL"
        :src="user.photoURL"
        spinner-color="white"
        style="max-width: 150px;"
        class="q-ma-lg"
      />
      <div
        v-else
        style="height: 200px; width: 200px;"
        class="bg-blue-grey-5 q-ma-lg row justify-center items-center"
      >
        <p class="text-white">No Profile Picture</p>
      </div>
    </div>

    <div class="row justify-center q-pb-sm">
      <q-btn color="primary" flat label="Edit Profile" to="/profile/edit" />
    </div>

    <div class="row justify-center">
            <q-list bordered separator style="max-width: 500px; flex:1">
        <q-item>
          <q-item-section avatar>
            <q-avatar color="red" text-color="white" icon="fas fa-user" />
          </q-item-section>

          <q-item-section>
            <q-item-label overline>NAME</q-item-label>
            <q-item-label>{{ user.displayName }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section avatar>
            <q-avatar color="blue" text-color="white" icon="fas fa-envelope" />
          </q-item-section>

          <q-item-section>
            <q-item-label overline>EMAIL</q-item-label>
            <q-item-label>{{ user.email }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section avatar>
            <q-avatar color="green" text-color="white" icon="fas fa-phone" />
          </q-item-section>

          <q-item-section>
            <q-item-label overline>PHONE NUMBER</q-item-label>
            <q-item-label>{{ user.phoneNumber || 'No linked phone number' }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>

    <div class="row justify-center q-pt-md">
      <q-btn v-if="!spotifyLoggedIn" style="background: #1DB954; color: #ffffff;" icon="fab fa-spotify" label="Connect Spotify Account" @click="authenticateSpotify" />
      <q-btn v-else style="background: #1DB954; color: #ffffff;" icon="fab fa-spotify" label="Remove Spotify Account" @click="removeSpotify" />
    </div>

    <div class="row justify-center q-mt-lg">

    </div>
  </q-page>
</template>

<script lang="ts">
import Vue from 'vue';
import firebase, { UserInfo } from 'firebase';
import 'firebase/firestore';
import { authenticateSpotify } from 'src/services/firebase/spotify';
import { UserProfile } from 'src/types';
import DocumentReference = firebase.firestore.DocumentReference;
const db = firebase.firestore();

export default Vue.extend({
  name: 'UserProfile',
  data() {
    return {
      user: <UserInfo>{},
      userProfile: <UserProfile>{},
      userProfileRef: <DocumentReference>{}
    };
  },
  methods: {
    authenticateSpotify,
    removeSpotify() {
      this.userProfileRef.update({spotifyCode: ''});
    }
  },
  computed: {
    spotifyLoggedIn(): boolean {
      return !!this.userProfile.spotifyCode;
    }
  },
  async created() {
    firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        this.user = user;
        this.userProfileRef = db.collection('users').doc(user.uid);

        this.userProfileRef
          .onSnapshot(doc => {
            this.userProfile = doc.data() as UserProfile;
          });
      }
    });
  }
});
</script>
