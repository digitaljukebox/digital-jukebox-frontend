<template>
  <q-page padding>
    <div class="row justify-center">
      <q-img
        v-if="user.photoURL"
        :src="user.photoURL"
        spinner-color="white"
        style="height: 200px; max-width: 200px;"
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
            <q-item-label>{{ user.phoneNumber }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
    <div class="row justify-center q-mt-lg">
      <q-btn color="primary" label="Edit Details" to="/profile/edit" />
    </div>
  </q-page>
</template>

<script lang="ts">
import Vue from 'vue';
import firebase from 'firebase';
import 'firebase/firestore';
const db = firebase.firestore();

export default Vue.extend({
  name: 'UserProfile',
  data() {
    return {
      user: null
    };
  },
  async created() {
    firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        this.user = user;
      }
    });
  }
});
</script>
