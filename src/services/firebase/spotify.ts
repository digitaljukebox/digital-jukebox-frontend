import firebase from 'firebase';
import 'firebase/firestore';

// this is a little gross but is needed to "monkey patch" the package to support the browser
import SpotifyWebApi from 'spotify-web-api-node';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import serverMethods from 'spotify-web-api-node/src/server-methods';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
SpotifyWebApi._addMethods(serverMethods);

const scopes = ['streaming', 'user-read-private', 'user-read-email']
const redirectUri = `${window.location.protocol}//${window.location.host}/spotifycallback`;
const clientId = '18aac906abf4434197d6280aca076f45';

export function authenticateSpotify() {
  const spotifyApi = new SpotifyWebApi({
    redirectUri: redirectUri,
    clientId: clientId
  });

  window.location.href = spotifyApi.createAuthorizeURL(scopes, '');
}

export function spotifyCallbackRoute(code: string) {
  const db = firebase.firestore();

  firebase.auth().onAuthStateChanged(async user => {
    let firebaseUser: firebase.User;

    if (user) {
      firebaseUser = { ...user };
    }

    if (firebaseUser) {
      await db.collection('users')
        .doc(firebaseUser.uid)
        .set({ spotifyCode: code })
    }
  });
}
