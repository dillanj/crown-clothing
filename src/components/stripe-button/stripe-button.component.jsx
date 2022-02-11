
import StripeCheckout from 'react-stripe-checkout';
import logo from '../../assets/crown.svg';
const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_51KRqxyFhV0ZXbplXTBe7LNNCMKvpq2rkW6EZ6SDTKTZwwQFXdqn8LkvXDij6D3PcIPwAqHPL24MEqYrHrSKtsPpY000XTOlImr';

  const onToken = token => {
    console.log(token);
    alert('Payment Successful');
  }
  return (
    <StripeCheckout
      label="Pay Now"
      name="Crown Clothing"
      billingAddress
      shippingAddress
      image={logo}
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;