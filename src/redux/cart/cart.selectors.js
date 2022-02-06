import { createSelector } from 'reselect';

const selectCart = state => state.cart;

export const selectCartItems = createSelector(
  [selectCart], // takes a collection
  (cart) => cart.cartItems
)

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  (cartItems) => cartItems.reduce( (accumulatedQuantity, cartItem) => accumulatedQuantity + cartItem.quantity, 0 /* start/default val = 0 */ )
)