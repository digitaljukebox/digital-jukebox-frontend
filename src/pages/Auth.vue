<template>
  <q-page padding>
    <div class="row justify-center">
      <h5>Sign in, or sign up for a new account below</h5>
    </div>

    <section id="firebaseui-auth-container"></section>
  </q-page>
</template>

<script>
import firebase, { auth } from 'firebase';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import 'firebase/firestore';

const db = firebase.firestore();

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
      callbacks: {
        signInSuccessWithAuthResult: () => {
          this.$router.push('/');
          return true;
        }
      },
      signInOptions: [
        {
          provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
          signInMethod:
            firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD
        },
        {
          provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          clientId:
            '120161791220-p271bsbvleeie316r40nmt7gfe9a92ip.apps.googleusercontent.com'
        },
        firebase.auth.PhoneAuthProvider.PROVIDER_ID
      ],
      credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO
    };

    ui.disableAutoSignIn();
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
