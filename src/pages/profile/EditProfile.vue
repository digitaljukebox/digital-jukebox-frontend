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
      <div class="q-gutter-y-md column" style="max-width: 300px; flex: 1">
        <q-input label="First Name" v-model="firstName">
          <template v-slot:prepend>
            <q-icon name="fas fa-user" />
          </template>
          <template v-slot:append>
            <q-icon
              name="fas fa-times-circle"
              @click="text = ''"
              class="cursor-pointer"
              color="grey"
            />
          </template>
        </q-input>
        <q-input label="Last Name" v-model="lastName">
          <template v-slot:prepend>
            <q-icon name="fas fa-user" />
          </template>
          <template v-slot:append>
            <q-icon
              name="fas fa-times-circle"
              @click="text = ''"
              class="cursor-pointer"
              color="grey"
            />
          </template>
        </q-input>
        <q-input label="Email Address" v-model="emailAddress">
          <template v-slot:prepend>
            <q-icon name="fas fa-envelope" />
          </template>
        </q-input>
      </div>
    </div>

    <div class="row justify-center q-mt-lg">
      <q-btn color="primary" label="Done" to="/profile" />
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'EditProfile',
  data() {
    return {
      firstName: 'Fristname',
      lastName: 'Lastname',
      emailAddress: 'email@example.com'
    };
  }
};
</script>
