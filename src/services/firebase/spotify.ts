import store from '../../store';
import { route } from 'quasar/wrappers';
import { RouteParams } from '@quasar/app';
import { Dictionary, SpotifyAuth } from '../../types';
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

export function getSpotifyOAuthAuthURI(): string {
  return spotifyOAuth.token.getUri();
}

export function spotifyCallbackRoute(hash: string) {
  const params = hash.split('&').map(part => part.replace(/#/, ''));

  const parsedParams: Dictionary<string | string> = {};

  params.forEach(param => {
    const parts = param.split('=');
    parsedParams[parts[0]] = parts[1];
  });

  const spotifyAuth: SpotifyAuth = {
    accessToken: parsedParams['access_token'],
    expiresIn: Number(parsedParams['expires_in']),
    state: parsedParams['state'],
    tokenType: parsedParams['token_type']
  };

  store.commit('spotify/updateAuthDetails', spotifyAuth);
  store.commit('spotify/setUserLoggedIn', true);
}
