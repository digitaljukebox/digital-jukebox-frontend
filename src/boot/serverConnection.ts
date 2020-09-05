import firebaseService from '../services/firebase';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default ({ store, Vue }) => {
  const config  = {
    apiKey: 'AIzaSyAu3v71qDLKEEF4QCpOezDfnJlBMXv3Kno',
    authDomain: 'digital-jukebox.firebaseapp.com',
    databaseURL: 'https://digital-jukebox.firebaseio.com',
    projectId: 'digital-jukebox',
    storageBucket: 'digital-jukebox.appspot.com',
    messagingSenderId: '120161791220',
    appId: '1:120161791220:web:741c8add205d08aad302a1',
    measurementId: 'G-RNTY5528DJ'
  };
  firebaseService.fBInit(config)

  // Tell the application what to do when the
  // authentication state has changed
  firebaseService.auth().onAuthStateChanged((user) => {
    firebaseService.handleOnAuthStateChanged(store, user)
  }, (error) => {
    console.error(error)
  })

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  Vue.prototype.$fb = firebaseService
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  store.$fb = firebaseService
}