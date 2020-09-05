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

    <div>
      <div class="row justify-center q-mb-lg">
        <q-btn
          @click="chooseImage"
          label="choose a new photo"
          :loading="uploadingImage"
          :percentage="uploadValue"
          color="secondary"
        />
        <input
          type="file"
          ref="input1"
          style="display: none"
          @change="previewImage"
          accept="image/*"
        />
      </div>
    </div>

    <div class="row justify-center">
      <div class="q-gutter-y-md column" style="max-width: 300px; flex: 1">
        <q-input label="Name" v-model="user.displayName">
          <template v-slot:prepend>
            <q-icon name="fas fa-user" />
          </template>
          <template v-slot:append>
            <q-icon
              name="fas fa-times-circle"
              @click="user.displayName = ''"
              class="cursor-pointer"
              color="grey"
            />
          </template>
        </q-input>
        <q-input label="Email Address" v-model="user.email">
          <template v-slot:prepend>
            <q-icon name="fas fa-envelope" />
          </template>
          <template v-slot:append>
            <q-icon
              name="fas fa-times-circle"
              @click="user.email = ''"
              class="cursor-pointer"
              color="grey"
            />
          </template>
        </q-input>
        <vue-phone-number-input
          v-model="user.phoneNumber"
          @update="
            e => {
              this.formattedNumber = e.formattedNumber;
              this.validNumber = e.isValid;
            }
          "
          default-country-code="AU"
        />
        <div id="recaptcha-container" />
      </div>
    </div>

    <div class="row justify-center q-mt-lg">
      <q-btn color="primary" label="Save" @click="save" :loading="saving" />
    </div>
  </q-page>
</template>

<script>
import Vue from 'vue';
import firebase from 'firebase';
import 'firebase/firestore';
const db = firebase.firestore();
import VuePhoneNumberInput from 'vue-phone-number-input';
import 'vue-phone-number-input/dist/vue-phone-number-input.css';
import { v4 } from 'uuid';

Vue.component('vue-phone-number-input', VuePhoneNumberInput);

export default {
  name: 'EditProfile',
  data() {
    return {
      user: {
        displayName: null,
        email: null,
        phoneNumber: null
      },
      formattedNumber: null,
      validNumber: null,
      firebaseUser: null,
      appVerifier: null,
      saving: false,
      imageData: null,
      image: null,
      uploadingImage: false,
      uploadValue: 0
    };
  },
  async created() {
    firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        this.user = { ...user };
        this.firebaseUser = user;
      }
    });
  },
  mounted() {
    if (this.appVerifier === null) {
      this.appVerifier = new firebase.auth.RecaptchaVerifier(
        'recaptcha-container',
        {
          size: 'invisible'
        }
      );
    }
  },
  methods: {
    chooseImage() {
      // trigger the file uploader
      this.$refs.input1.click();
    },
    previewImage(event) {
      this.image = null;
      this.imageData = event.target.files[0];
      this.onUpload();
    },
    onUpload() {
      this.uploadingImage = true;
      this.user.photoURL = null;

      const storageRef = firebase
        .storage()
        .ref(`profile-pictures/${this.firebaseUser.uid}:${v4()}`)
        .put(this.imageData);

      storageRef.on(
        `state_changed`,
        snapshot => {
          this.uploadValue =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        error => {
          console.log(error.message);
        },
        () => {
          this.uploadValue = 100;
          storageRef.snapshot.ref.getDownloadURL().then(url => {
            this.user.photoURL = url;
            this.uploadingImage = false;
            this.uploadValue = 0;
          });
        }
      );
    },
    async save() {
      this.saving = true;

      try {
        // check if the phone number has updated and verify with sms code
        if (this.firebaseUser.phoneNumber !== this.formattedNumber) {
          if (!this.validNumber) {
            alert('Phone number is invalid');
            this.saving = false;
            return;
          }

          if (this.formattedNumber === '') {
            alert('cant remove phone number');
            this.user.phoneNumber = this.firebaseUser.phoneNumber;
            this.saving = false;
            return;
          }

          const provider = new firebase.auth.PhoneAuthProvider();
          const verificationId = await provider.verifyPhoneNumber(
            this.formattedNumber,
            this.appVerifier
          );

          const verificationCode = window.prompt(
            'Please enter the verification ' +
              'code that was sent to your mobile device.'
          );

          const phoneCredential = firebase.auth.PhoneAuthProvider.credential(
            verificationId,
            verificationCode
          );

          await this.firebaseUser.updatePhoneNumber(phoneCredential);
        }

        // check if email has update
        if (this.firebaseUser.email !== this.user.email) {
          if (this.user.email === '') {
            alert('Cant remove email');
            this.user.email = this.firebaseUser.email;
            this.saving = false;
            return;
          }
          await this.firebaseUser.updateEmail(this.user.email);
        }

        await this.firebaseUser.updateProfile({
          displayName: this.user.displayName,
          photoURL: this.user.photoURL
        });

        this.$router.push('/profile');
      } catch (error) {
        alert(error);
        // do something
        this.saving = false;
      }
    }
  }
};
</script>
