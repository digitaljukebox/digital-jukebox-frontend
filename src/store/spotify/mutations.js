export function updateAuthDetails(state, spotifyAuth) {
  state.accessToken = spotifyAuth.accessToken;
  state.expiresIn = spotifyAuth.expiresIn;
  state.tokenType = spotifyAuth.tokenType;
  state.state = spotifyAuth.state;
  state.loggedIn = true;
}

export function setUserLoggedIn(state, payload) {
  state.loggedIn = payload;
}
