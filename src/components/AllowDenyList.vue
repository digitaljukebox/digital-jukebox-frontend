<template>
  <div class="row q-col-gutter-md">
    <div class="q-my-md col-sm-12 col-md-6">
      <q-toolbar class="bg-primary text-white">
        <q-toolbar-title>Allow List</q-toolbar-title>
        <q-btn flat round @click="addAllowList = !addAllowList"><q-icon name="fas fa-plus"/></q-btn>
      </q-toolbar>

      <q-list bordered separator>
        <q-item>
          <q-item-section>
            <span>The songs and artists in this list are the only songs allowed to be played. The Deny List will override anything specified here.</span>
          </q-item-section>
        </q-item>

        <q-item v-if="addAllowList">
          <q-item-section>
            <q-input v-model="addDenyListItem" label="Search for a song or artist" />
          </q-item-section>
        </q-item>

        <q-item v-if="!allowList.length">
          <q-item-section>
          There are no items in the Allow List.
          </q-item-section>
        </q-item>

        <q-item v-for="element in allowList" :key="element.id">
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

          <q-item-section side>
            <div class="row items-center q-gutter-sm">
              <q-btn flat round color="negative" icon="fas fa-times-circle" />
            </div>
          </q-item-section>
        </q-item>
      </q-list>
    </div>

    <div class="q-my-md col-sm-12 col-md-6">
      <q-toolbar class="bg-primary text-white">
        <q-toolbar-title>Deny List</q-toolbar-title>
        <q-btn flat round @click="addDenyList = !addDenyList"><q-icon name="fas fa-plus"/></q-btn>
      </q-toolbar>

      <q-list bordered separator>
        <q-item>
          <q-item-section>
            <span>The songs and artists in this list will not be allowed to be played.</span>
          </q-item-section>
        </q-item>

        <q-item v-if="addDenyList">
          <q-item-section>
            <q-input v-model="addAllowListItem" label="Search for a song or artist" />
          </q-item-section>
        </q-item>

        <q-item v-if="!denyList.length">
          <q-item-section>
            There are no items in the Allow List.
          </q-item-section>
        </q-item>

        <q-item v-for="element in denyList" :key="element.id">
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

          <q-item-section side>
            <div class="row items-center q-gutter-sm">
              <q-btn flat round color="negative" icon="fas fa-times-circle" />
            </div>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from '@vue/composition-api';
import firebase from 'firebase';
import 'firebase/firestore';
const db = firebase.firestore();

export default defineComponent({
  name: 'AllowDenyList',
  data() {
    return {
      addAllowList: false,
      addDenyList: false,
      allowList: [],
      denyList: [
      { id: 1, name: 'hi' },
      { id: 2, name: 'hello' }
    ]
    };
  },
  created() {
    firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        this.user = user;
      }
    });
  },
  mounted() {
    this.venueId = this.$route.params.id;
  },
  methods: {
  }
});
</script>
