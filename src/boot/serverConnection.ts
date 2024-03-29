import firebaseService from '../services/firebase';

export default ({ Vue }: { Vue: Vue }) => {
  const config = {
    apiKey: 'AIzaSyAu3v71qDLKEEF4QCpOezDfnJlBMXv3Kno',
    authDomain: 'digital-jukebox.firebaseapp.com',
    databaseURL: 'https://digital-jukebox.firebaseio.com',
    projectId: 'digital-jukebox',
    storageBucket: 'digital-jukebox.appspot.com',
    messagingSenderId: '120161791220',
    appId: '1:120161791220:web:741c8add205d08aad302a1',
    measurementId: 'G-RNTY5528DJ'
  };

  firebaseService.fBInit(config);

  (Vue as any).prototype.$fb = firebaseService;
};
