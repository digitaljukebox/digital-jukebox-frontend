import store from '../../store';
import ClientOAuth2 from 'client-oauth2';

const redirectUri = `http://localhost:8080/spotify-callback`;

export function toSpotifySignIn() {
  window.location.replace(getSpotifyOAuthAuthURI());
}

const spotifyOAuth = new ClientOAuth2({
  clientId: 'bcc1ec28d893433682d09c6f04cdc6c8',
  authorizationUri: 'https://accounts.spotify.com/authorize',
  redirectUri,
  scopes: []
});

export function getSpotifyOAuthAuthURI() {
  return spotifyOAuth.token.getUri();
}

export function spotifyCallbackRoute(hash) {
  const params = hash.split('&').map(part => part.replace(/#/, ''));

  const parsedParams = {};

  params.forEach(param => {
    const parts = param.split('=');
    parsedParams[parts[0]] = parts[1];
  });

  const spotifyAuth = {
    accessToken: parsedParams['access_token'],
    expiresIn: Number(parsedParams['expires_in']),
    state: parsedParams['state'],
    tokenType: parsedParams['token_type']
  };

  store.commit('spotify/updateAuthDetails', spotifyAuth);
  store.commit('spotify/setUserLoggedIn', true);
}
