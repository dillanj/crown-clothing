import { CustomButtonContainer } from './custom-button.styles';

// import './custom-button.styles.scss';

const CustomButton = ({ children , ...otherProps }) => (
  // <button 
  //   className={`${otherProps.inverted ? 'inverted' : ''} ${otherProps.isGoogleSignIn ? 'google-sign-in' : ''} custom-button`}
  //  {...otherProps} 
  // >
  //   {children}
  // </button>
  <CustomButtonContainer {...otherProps}>
    { children }
  </CustomButtonContainer>
);

export default CustomButton