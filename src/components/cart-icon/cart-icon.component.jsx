import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg'
import { connect } from 'react-redux';

import { toggleCartHidden } from '../../redux/cart/cart.actions';

import './cart-icon.styles.scss';


const CartIcon = ({toggleCartHidden, itemsInCart}) => (
  <div className="cart-icon" onClick={toggleCartHidden}>
    <ShoppingIcon className='shopping-icon'/>
    <span className="item-count">{itemsInCart}</span>
  </div>
);

const mapStateToProps = ({cart}) => ({
  itemsInCart: cart.cartItems.length
})

const mapDispatchToProps = dispatch => ({
  toggleCartHidden: () => dispatch(toggleCartHidden())
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);