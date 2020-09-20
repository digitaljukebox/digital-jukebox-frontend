import { SpotifyAuth } from 'src/types';
import { SpotifyState } from './state';

export function updateAuthDetails(
  state: SpotifyState,
  spotifyAuth: SpotifyAuth
) {
  state.accessToken = spotifyAuth.accessToken;
  state.expiresIn = spotifyAuth.expiresIn;
  state.tokenType = spotifyAuth.tokenType;
  state.state = spotifyAuth.state;
  state.loggedIn = true;
}

export function setUserLoggedIn(state: SpotifyState, payload: boolean) {
  state.loggedIn = payload;
}
