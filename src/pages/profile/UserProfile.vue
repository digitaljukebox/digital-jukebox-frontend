<template>
  <q-page padding>
    <div class="row justify-center">
      <q-img
        src="../../assets/profilePicturePlaceholder.jpg"
        spinner-color="white"
        style="height: 200px; max-width: 200px;"
        class="q-ma-lg"
      />
    </div>
    <div class="row justify-center">
      <q-list bordered separator style="max-width: 500px; flex:1">
        <q-item>
          <q-item-section avatar>
            <q-avatar color="red" text-color="white" icon="fas fa-user" />
          </q-item-section>

          <q-item-section>
            <q-item-label overline>NAME</q-item-label>
            <q-item-label>Firstname Lastname</q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section avatar>
            <q-avatar color="blue" text-color="white" icon="fas fa-envelope" />
          </q-item-section>

          <q-item-section>
            <q-item-label overline>EMAIL</q-item-label>
            <q-item-label>email@example.com</q-item-label>
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
export default Vue.extend({
  name: 'UserProfile'
});
</script>
