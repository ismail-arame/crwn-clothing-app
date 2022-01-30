//ACTION Creator Functions

//and they are literally just functions that returns object
//the only thing is each object is in the correct format that the action is expected to be

import userActionTypes from "./user.types";

//GOOGLE SIGN IN
export const googleSignInStart = () => ({
  type: userActionTypes.GOOGLE_SIGN_IN_START,
});

export const signInSuccess = (user) => ({
  type: userActionTypes.SIGN_IN_SUCCESS,
  payload: user,
});

export const signInFailure = (error) => ({
  type: userActionTypes.SIGN_IN_FAILURE,
  payload: error,
});

//EMAIL SIGN IN
export const emailSignInStart = (emailAndPassword) => ({
  type: userActionTypes.EMAIL_SIGN_IN_START,
  payload: emailAndPassword,
});

export const checkUserSession = () => ({
  type: userActionTypes.CHECK_USER_SESSION,
});

//SIGN OUT
export const signOutStart = () => ({
  type: userActionTypes.SIGN_OUT_START,
});

export const signOutSuccess = () => ({
  type: userActionTypes.SIGN_OUT_SUCCESS,
});

export const signOutFailure = (error) => ({
  type: userActionTypes.SIGN_OUT_FAILURE,
  payload: error,
});

//SIGN UP
export const signUpStart = (userCredentials) => ({
  type: userActionTypes.SIGN_UP_START,
  payload: userCredentials,
});

export const signUpSuccess = ({ user, additionalData }) => ({
  type: userActionTypes.SIGN_UP_SUCCESS,
  payload: { user, additionalData },
});
export const signUpFailure = (error) => ({
  type: userActionTypes.SIGN_UP_FAILURE,
  payload: error,
});
