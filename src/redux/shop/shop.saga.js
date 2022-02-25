import { takeLatest, call, put } from 'redux-saga/effects';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils' ;
import { collection, getDocs } from 'firebase/firestore';

import { fetchCollectionsSuccess, fetchCollectionsFailure } from './shop.actions';


import ShopActionTypes from './shop.types';

export function* fetchCollectionsAsync(){
  yield console.log("I am fired!");

  try {
    const snapshot = yield getDocs(collection(firestore, 'collections'));
    const collectionsMap = yield call( convertCollectionsSnapshotToMap, snapshot );
    yield put(fetchCollectionsSuccess(collectionsMap));
  }
  catch(err){
    yield put(fetchCollectionsFailure(err.message));
  }
  
}

export function* fetchCollectionsStart(){
  yield takeLatest(ShopActionTypes.FETCH_COLLECTIONS_START, fetchCollectionsAsync);

}