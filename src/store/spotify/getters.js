export function getSpotifyAuth(state) {
  return {
    accessToken: state.accessToken,
    tokenType: state.tokenType,
    expiresIn: state.expiresIn,
    state: state.state
  };
}

export function isSpotifyLogin(state) {
  return state.loggedIn;
}
