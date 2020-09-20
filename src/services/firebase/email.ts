import firebase from 'firebase/app';
import 'firebase/auth';

/**
 * https: //firebase.google.com/docs/reference/js/firebase.auth.auth.html#create-user-with-email-and-password
 *
 * @param {String} email - A Valid email
 * @param {String} password - Password
 *
 * @return {Promise} UserCredentials
 */
export const createUserWithEmail = async (email: string, password: string) => {
  return firebase.auth().createUserWithEmailAndPassword(email, password);
};

/**
 * @param {String} email - A Valid email
 * @param {String} password - Password
 *
 * @return {Promise} UserCredentials
 */
export const loginWithEmail = (email: string, password: string) => {
  return firebase.auth().signInWithEmailAndPassword(email, password);
};
