<template>
  <q-page padding>
    <h3>Venue Details</h3>
    <p>Details about your venue</p>
    <p>Numbers of users, etc.?</p>
    <div class="row"><q-btn label="Ban Lists?" /></div>
    <div class="row q-mt-lg">
      <q-btn
        color="primary"
        label="Edit Venue Details"
        @click="navigateToEditPage"
      />
    </div>
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
  data() {
    return {
      venueId: null
    };
  },
  mounted() {
    this.venueId = this.$route.params.id;
  },
  methods: {
    navigateToEditPage() {
      this.$router.push(`/manage-venues/${this.venueId}/edit`);
    }
  }
};
</script>
