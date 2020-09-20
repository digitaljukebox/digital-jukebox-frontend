<template>

</template>

<script>
import { defineComponent, ref } from '@vue/composition-api';
import firebase from 'firebase';
import 'firebase/firestore';
const db = firebase.firestore();

export default defineComponent({
  name: 'CreateVenue',
  data() {
    return {
      AllowList: [],
      DenyList: []
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
