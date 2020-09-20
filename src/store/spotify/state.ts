export interface SpotifyState {
  loggedIn: boolean;
  accessToken: string;
  tokenType: string;
  expiresIn: Number;
  state: string;
}

export default function() {
  return {
    loggedIn: false,
    accessToken: null,
    tokenType: null,
    expiresIn: null,
    state: null
  } as SpotifyState;
}
