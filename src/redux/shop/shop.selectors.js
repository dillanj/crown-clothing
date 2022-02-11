import { createSelector } from 'reselect';
import memoize from 'lodash.memoize'; // used to memoize a selector with a dynamic param

const selectShop = state => state.shop;


export const selectCollections = createSelector(
  [selectShop],
  shop => shop.collections
);

export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  collections => Object.keys(collections).map(key => collections[key])
);

export const selectCollection = memoize((collectionUrlParam) => 
// returning the createSelector function (currying) - returning a function within a function
  createSelector(
    [selectCollections],
    collections => collections[collectionUrlParam]
  )
);
