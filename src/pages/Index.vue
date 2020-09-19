<template>
  <q-page class="row items-center justify-center">
    <div class="col" style="max-width: 400px">
      <q-card class="my-card bg-primary text-white">
        <q-card-section>
          <div class="text-h6">Check In</div>
        </q-card-section>

        <q-card-section>
          Looking to check in? Visit our nearby venues page to find your venue
          and start adding songs to the queue.
        </q-card-section>

        <q-separator dark />

        <q-card-actions align="right">
          <q-btn
            flat
            to="nearby"
            icon-right="fas fa-arrow-right"
            label="Nearby Venues"
          />
        </q-card-actions>
      </q-card>
      <q-card class="my-card bg-secondary text-white">
        <q-card-section>
          <div class="text-h6">Edit Profile</div>
        </q-card-section>

        <q-card-section>
          Edit your profile to add a profile picture, phone number, or email
          address.
        </q-card-section>

        <q-separator dark />

        <q-card-actions align="right">
          <q-btn
            flat
            to="profile"
            icon-right="fas fa-arrow-right"
            label="Your Profile"
          />
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<script lang="ts">
import { Todo, Meta } from 'components/models';
import { defineComponent, ref } from '@vue/composition-api';

export default defineComponent({
  name: 'PageIndex'
});
</script>

<style>
.my-card {
  margin-top: 50px;
  margin-bottom: 50px;
}
</style>
