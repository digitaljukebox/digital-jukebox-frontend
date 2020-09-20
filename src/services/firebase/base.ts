import firebase from 'firebase/app';
import 'firebase/auth';

require('firebase/firestore');

/**
 * Firebase's auth interface method
 * https: //firebase.google.com/docs/reference/js/firebase.auth.html#callable
 * @return {Object} currentUser object from firebase
 */
export const auth = () => {
  return firebase.auth();
};

/**
 * Async function providing the application time to
 * wait for firebase to initialize and determine if a
 * user is authenticated or not with only a single observable
 */
export const ensureAuthIsInitialized = async (store: any) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (store.state?.auth?.isReady) return true;
  // Create the observer only once on init
  return new Promise((resolve, reject) => {
    // Use a promise to make sure that the router will eventually show the route after the auth is initialized.
    const unsubscribe = firebase.auth().onAuthStateChanged(
      user => {
        resolve();
        unsubscribe();
      },
      () => {
        reject(
          new Error(
            'Looks like there is a problem with the firebase service. Please try again later'
          )
        );
      }
    );
  });
};

/** Convenience method to initialize firebase app
 * @param  {Object} config
 * @return {Object} App
 */
export const fBInit = (config: any) => {
  return firebase.initializeApp(config);
};

export const getFirestore = () => {
  return firebase.firestore();
};

/** Handle the auth state of the user and
 * set it in the auth store module
 * @param  {Object} store - Vuex Store
 * @param  {Object} currentUser - Firebase currentUser
 */
export const handleOnAuthStateChanged = (store: any, currentUser: any) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const initialAuthState = isAuthenticated(store);
  // Save to the store
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
  store.commit('auth/setAuthState', {
    isAuthenticated: currentUser !== null,
    isReady: true
  });

  // If the user loses authentication route
  // them to the login page
  if (!currentUser && initialAuthState) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    store.dispatch('auth/routeUserToAuth');
  }
};

/**
 * @param  {Object} store - Vuex store
 */
export const isAuthenticated = (store: any) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-member-access
  return store?.state?.auth?.isAuthenticated;
};

/**
 * remove firebase auth token
 */
export const logoutUser = () => {
  return auth().signOut();
};
