import { takeLatest, put, all, call } from 'redux-saga/effects';

import UserActionTypes from './user.types';

import { auth, googleProvider, createUserProfileDocument, getCurrentUser } from '../../firebase/firebase.utils';
import { getDoc  } from 'firebase/firestore';
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword  } from 'firebase/auth';

import { signInSuccess, signInFailure, signOutSuccess, signOutFailure, signUpSuccess, signUpFailure } from './user.actions';

export function* getSnapshotFromUserAuth(userAuth, additionalData){
  try {
    const userRef = yield call(createUserProfileDocument, userAuth, additionalData);
    const userSnapshot = yield getDoc(userRef);
    yield put( signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }) );
  }
  catch(error){
    yield put(signInFailure(error));
  }
};


// GOOGLE SIGN IN

export function* signInWithGoogle() {
  try {
    const {user} = yield signInWithPopup(auth, googleProvider);
    yield getSnapshotFromUserAuth(user);
  }
  catch(error) {
    yield put(signInFailure(error));
  }
};

export function* onGoogleSignInStart() {
  yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
};


/// EMAIL SIGN IN
export function* signInWithEmail({ payload: { email, password } }) {
  try {
    const { user } = yield signInWithEmailAndPassword(auth, email, password);
    yield getSnapshotFromUserAuth(user);
  }
  catch(error){
    yield put(signInFailure(error));
  }
};

export function* onEmailSignInStart() {
  yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
};

// SIGN OUT 
export function* signOut(){
  try{
    yield auth.signOut();
    yield put(signOutSuccess());
  }
  catch(error){
    yield put(signOutFailure(error));
  }
};

export function* onSignOutStart() {
  yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut)
};

// SIGN UP
export function* signUp({payload: { email, password, displayName }}){
  try {
    const { user } = yield createUserWithEmailAndPassword( auth, email, password );
    yield put(signUpSuccess({ user: user, additionalData: {displayName} }));
  } catch(error){
    yield put(signUpFailure(error));
  }
};

export function* signInAfterSignUp({ payload: {user, additionalData}}){
  yield getSnapshotFromUserAuth(user, additionalData);
};

export function* onSignUpStart() {
  yield takeLatest(UserActionTypes.SIGN_UP_START, signUp);
};

export function* onSignUpSuccess() {
  yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp);
};


// CHECK USER SESSION
export function* isUserAuthenticated() {
  try{
    const userAuth = yield getCurrentUser();
    if(!userAuth){ return; } // if userAuth is null (no user)
    yield getSnapshotFromUserAuth(userAuth);
  }
  catch(error){
    yield put(signInFailure(error));
  }
};

export function* onCheckUserSession() {
  yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
};


// SAGA LISTENERS

export function* userSagas() {
  yield all([
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onCheckUserSession),
    call(onSignOutStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
  ])
};




