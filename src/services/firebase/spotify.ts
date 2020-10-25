import firebase from 'firebase';
import 'firebase/firestore';

// this is a little gross but is needed to "monkey patch" the package to support the browser
import SpotifyWebApi from 'spotify-web-api-node';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import serverMethods from 'spotify-web-api-node/src/server-methods';
import { UserProfile } from 'src/types';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
SpotifyWebApi._addMethods(serverMethods);

const scopes = ['streaming', 'user-read-private', 'user-read-email']
const redirectUri = `${window.location.protocol}//${window.location.host}/spotifycallback`;
const clientId = '18aac906abf4434197d6280aca076f45';
const sId = '2a8bf2753891411b977d1ebf912e3cfc';

export function authenticateSpotify() {
  const spotifyApi = new SpotifyWebApi({
    redirectUri: redirectUri,
    clientId: clientId,
    clientSecret: sId,
  });

  window.location.href = spotifyApi.createAuthorizeURL(scopes, '')
}

export async function refreshSpotifyToken() {
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        const db = firebase.firestore();
        db.collection('users').doc(user.uid).onSnapshot(async doc => {
          const userProfile = await doc.data() as UserProfile;

          const spotifyApi = new SpotifyWebApi({
            redirectUri: redirectUri,
            clientId: clientId,
            clientSecret: sId,
            refreshToken: userProfile.spotify.refreshToken,
          });

          console.log(userProfile.spotify.refreshToken);

          spotifyApi.refreshAccessToken().then((data) => {
              console.log(data);
              firebase.auth().onAuthStateChanged(async user => {
                let firebaseUser: firebase.User;
                if (user) {
                  firebaseUser = { ...user };
                }

                if (firebaseUser) {
                  await db.collection('users')
                    .doc(firebaseUser.uid)
                    .update({ spotify: {
                        accessToken: data.body.access_token,
                        expiresAt: Math.floor(Date.now() / 1000 + data.body['expires_in'])
                      } })
                }
                resolve(data.body.access_token)
              });

              // Set the access token on the API object to use it in later calls
              spotifyApi.setAccessToken(data.body['access_token']);
            },
            function(err) {
              console.log('Something went wrong!', err);
              reject(err);
            }
          );
        });
      }
    });
  })
}

export async function spotifyCallbackRoute(code: string) {
  const spotifyApi = new SpotifyWebApi({
    redirectUri: redirectUri,
    clientId: clientId,
    clientSecret: sId,
  });

  await spotifyApi.authorizationCodeGrant(code).then(
    function(data) {
      const db = firebase.firestore();
      firebase.auth().onAuthStateChanged(async user => {
        let firebaseUser: firebase.User;
        if (user) {
          firebaseUser = { ...user };
        }

        if (firebaseUser) {
          await db.collection('users')
            .doc(firebaseUser.uid)
            .set({ spotify: {
                accessToken: data.body['access_token'],
                refreshToken: data.body['refresh_token'],
                expiresAt: Math.floor(Date.now() / 1000 + data.body['expires_in'])
              } })
        }
      });

      // Set the access token on the API object to use it in later calls
      spotifyApi.setAccessToken(data.body['access_token']);
      spotifyApi.setRefreshToken(data.body['refresh_token']);
    },
    function(err) {
      console.log('Something went wrong!', err);
    }
  );
}
