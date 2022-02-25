import { takeLatest, put, all, call } from 'redux-saga/effects';

import UserActionTypes from './user.types';

import { auth, googleProvider, createUserProfileDocument } from '../../firebase/firebase.utils';
import { getDoc  } from 'firebase/firestore';
import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';

import { signInSuccess, signInFailure } from './user.actions';

export function* getSnapshotFromUserAuth(userAuth){
  try {
    const userRef = yield call(createUserProfileDocument, userAuth);
    const userSnapshot = yield getDoc(userRef);
    yield put( signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }) );
  }
  catch(error){
    yield put(signInFailure(error));
  }
}


// GOOGLE

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


/// EMAIL


export function* signInWithEmail({ payload: { email, password } }) {
  try {
    const { user } = yield signInWithEmailAndPassword(auth, email, password);
    yield getSnapshotFromUserAuth(user);
  }
  catch(error){
    yield put(signInFailure(error));
  }

}

export function* onEmailSignInStart() {
  yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}


export function* userSagas() {
  yield all([
    call(onGoogleSignInStart),
    call(onEmailSignInStart)
  ])
};

