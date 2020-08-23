/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-call */
// Remember, we have access to our Vue instance not using
// an arrow function in our actions file. This allows us
// to create a scoped reference to our firebaseService - $fb
// That was assigned to the Vue instance earlier in our serviceConnection
// boot file.

export const createNewUser = function ($root: any, data: { email: string; password: string }) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
  const $fb = this.$fb
  const { email, password } = data
  return $fb.createUserWithEmail(email, password)
}

export const loginUser = function ($root: any, payload: { email: any; password: any }) {
  const $fb = this.$fb
  const { email, password } = payload
  return $fb.loginWithEmail(email, password)
}

export const logoutUser = async function () {
  const $fb = this.$fb
  await $fb.logoutUser()
}

export function routeUserToAuth () {
  this.$router.push({
    path: '/auth/login'
  })
}
