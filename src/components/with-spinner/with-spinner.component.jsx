
import { SpinnerContainer, SpinnerOverlay } from "./with-spinner.styles";

// const WithSpinner = WrappedComponent => ({isLoading, ...otherProps}) => {
//   return isLoading ? (
//     <SpinnerOverlay>
//       <SpinnerContainer />
//     </SpinnerOverlay>
//   ) : (
//     <WrappedComponent {...otherProps} />
//   )
// }

// A CLEARER WAY TO WRITE THE ABOVE CODE //

const WithSpinner = WrappedComponent => {
  const Spinner =  ({isLoading, ...otherProps}) => {
    return isLoading ? (
      <SpinnerOverlay>
        <SpinnerContainer />
      </SpinnerOverlay>
    ) : (
      <WrappedComponent {...otherProps} />
    );
  };
  return Spinner;
};

export default WithSpinner;