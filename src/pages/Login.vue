<template>
  <div class="fixed-center text-center">
    <div id="firebaseui-auth-container"></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import * as firebase from 'firebase';
import * as firebaseui from 'firebaseui';

var ui = new firebaseui.auth.AuthUI(firebase.auth());
let provider = (firebase.auth as any).EmailAuthProvider.PROVIDER_ID;


var uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function(authResult: any, redirectUrl: any) {
      return true;
    },
    uiShown: function() {
      let loader = (document.getElementById('loader') as any);
      loader.style.display = 'none';
    }
  },
  signInFlow: 'popup',
  signInSuccessUrl: '/',
  signInOptions: [
    {
      provider,
      requireDisplayName: false
    }
  ]
};


ui.start('#firebaseui-auth-container', uiConfig);

@Component
export default class Login extends Vue {}
</script>
