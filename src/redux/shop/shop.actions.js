import ShopActionTypes from "./shop.types";

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils' ;
import { collection, getDocs } from 'firebase/firestore';

export const fetchCollectionsStart = () => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_START,
});

export const fetchCollectionsSuccess = collectionsMap => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collectionsMap
});

export const fetchCollectionsFailure = errorMessage => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
  payload: errorMessage
})

export const fetchCollectionsStartAsync = () => { // THIS IS A REDUX THUNK
  return dispatch => {
    dispatch(fetchCollectionsStart());

    getDocs(collection(firestore, 'collections'))
    .then((snapshot) => {
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
      dispatch( fetchCollectionsSuccess(collectionsMap) );
    })
    .catch((err) => {
      console.log("error retrieving collections from firebase", err.message);
      dispatch( fetchCollectionsFailure(err.message) );
    })
  };
}

