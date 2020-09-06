import { SpotifyState } from './state';
import { SpotifyAuth } from 'src/types';

export function getSpotifyAuth(state: SpotifyState): SpotifyAuth {
  return {
    accessToken: state.accessToken,
    tokenType: state.tokenType,
    expiresIn: state.expiresIn,
    state: state.state
  };
}

export function isSpotifyLogin(state: SpotifyState): boolean {
  return state.loggedIn;
}
