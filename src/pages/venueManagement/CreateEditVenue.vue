<template>
  <q-page padding>
    <div class="row justify-center">
      <q-img
        v-if="venue.photoURL"
        :src="venue.photoURL"
        spinner-color="white"
        style="height: 200px; max-width: 200px;"
        class="q-ma-lg"
      />
      <div
        v-else
        style="height: 200px; width: 200px;"
        class="bg-blue-grey-5 q-ma-lg row justify-center items-center"
      >
        <p class="text-white">No Venue Picture</p>
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
        <q-input label="Name" v-model="venue.name">
          <template v-slot:prepend>
            <q-icon name="fas fa-cocktail" />
          </template>
          <template v-slot:append>
            <q-icon
              name="fas fa-times-circle"
              @click="venue.name = ''"
              class="cursor-pointer"
              color="grey"
            />
          </template>
        </q-input>
        <q-input label="Description" autogrow v-model="venue.description">
          <template v-slot:prepend>
            <q-icon name="fas fa-file-alt" />
          </template>
          <template v-slot:append>
            <q-icon
              name="fas fa-times-circle"
              @click="venue.description = ''"
              class="cursor-pointer"
              color="grey"
            />
          </template>
        </q-input>
        <q-input label="Email Address" v-model="venue.email">
          <template v-slot:prepend>
            <q-icon name="fas fa-envelope" />
          </template>
          <template v-slot:append>
            <q-icon
              name="fas fa-times-circle"
              @click="venue.email = ''"
              class="cursor-pointer"
              color="grey"
            />
          </template>
        </q-input>
        <q-input label="Phone Number" v-model="venue.phoneNumber">
          <template v-slot:prepend>
            <q-icon name="fas fa-phone" />
          </template>
          <template v-slot:append>
            <q-icon
              name="fas fa-times-circle"
              @click="venue.phoneNumber = ''"
              class="cursor-pointer"
              color="grey"
            />
          </template>
        </q-input>
        <q-input label="Website" v-model="venue.website">
          <template v-slot:prepend>
            <q-icon name="fas fa-globe" />
          </template>
          <template v-slot:append>
            <q-icon
              name="fas fa-times-circle"
              @click="venue.website = ''"
              class="cursor-pointer"
              color="grey"
            />
          </template>
        </q-input>
      </div>
    </div>

    <div class="q-mt-lg">
      <div class="row justify-center q-mt-sm">
        <GmapMap
          :center="center"
          :zoom="zoom"
          style="width: 500px; height: 300px"
          :options="{
            zoomControl: true,
            mapTypeControl: false,
            scaleControl: false,
            streetViewControl: false,
            rotateControl: false,
            fullscreenControl: false,
            disableDefaultUi: false
          }"
        >
          <div slot="visible">
            <div
              style="top: 10px; left: 10px; right: 10px; width: calc(100% - 20px); position:absolute; z-index: 100"
            >
              <GmapAutocomplete
                @place_changed="place => updatePlace(place)"
                style="width: 100%"
              />
            </div>
          </div>
          <GmapMarker
            v-if="venue.location"
            :position="{
              lat: venue.location.latitude,
              lng: venue.location.longitude
            }"
          />
        </GmapMap>
      </div>
    </div>

    <div class="row justify-center q-mt-lg">
      <div class="q-gutter-y-md column" style="max-width: 300px; flex: 1">
        <q-input label="Address" autogrow v-model="venue.address" readonly="">
          <template v-slot:prepend>
            <q-icon name="fas fa-map-marker" />
          </template>
        </q-input>
        <div class="row justify-center">
          <q-btn label="Save" color="primary" @click="saveVenue" />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import firebase from 'firebase';
import 'firebase/firestore';
const db = firebase.firestore();
import { v4 } from 'uuid';

export default defineComponent({
  name: 'CreateVenue',
  data() {
    return {
      venue: {
        description: null,
        name: null,
        photoURL: null,
        location: null,
        address: null,
        email: null,
        phoneNumber: null
      },
      center: {
        lat: -27.4697707,
        lng: 153.0251235
      },
      zoom: 7,
      image: null,
      imageData: null,
      uploadingImage: null,
      uploadValue: 0,
      user: null,
      venueId: null
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
    db.collection('venues')
      .doc(this.venueId)
      .get()
      .then(doc => {
        let data = doc.data() as any;
        this.venue = { ...data, location: { ...data.location } };
        console.log(data);

        this.center = {
          lat: data.location.latitude,
          lng: data.location.longitude
        };
      });
  },
  methods: {
    updatePlace(place: any) {
      console.log(place);
      console.log(place.formatted_address);
      this.venue.address = place.formatted_address;
      this.venue.location = {
        latitude: place.geometry.location.lat(),
        longitude: place.geometry.location.lng()
      };
      this.center = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      };
      this.zoom = 15;
    },
    saveVenue() {
      db.collection('venues')
        .doc(this.venueId ?? `${v4()}`)
        .set({ ...this.venue, manager: this.user.uid })
        .then(() => this.$router.push('/manage-venues'));
    },
    chooseImage() {
      // trigger the file uploader
      (this.$refs.input1 as any).click();
    },
    previewImage(event: any) {
      this.image = null;
      this.imageData = event.target.files[0];
      this.onUpload();
    },
    onUpload() {
      this.uploadingImage = true;
      this.venue.photoURL = null;

      const storageRef = firebase
        .storage()
        .ref(`venue-pictures/${v4()}`)
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
            this.venue.photoURL = url;
            this.uploadingImage = false;
            this.uploadValue = 0;
          });
        }
      );
    }
  }
});
</script>
