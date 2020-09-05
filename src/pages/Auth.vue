<template>
  <q-page padding>
    <div class="row justify-center">
      <h5>Sign in, or sign up for a new account below</h5>
    </div>

    <section id="firebaseui-auth-container"></section>
  </q-page>
</template>

<script>
import firebase from 'firebase';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';

export default {
  name: 'Auth',
  data() {
    return {
      email: null,
      isPwd: true,
      password: null,
      passwordMatch: null
    };
  },
  mounted() {
    let ui = firebaseui.auth.AuthUI.getInstance();
    if (!ui) {
      ui = new firebaseui.auth.AuthUI(firebase.auth());
    }

    const uiConfig = {
      signInSuccessUrl: '/profile',
      signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID]
    };
    ui.start('#firebaseui-auth-container', uiConfig);
  }
};
</script>

<style lang="stylus">
.authentication
  margin auto
  max-width 30em
  width 100%
</style>
