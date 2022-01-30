import React from "react";

import { SpinnerOverlay, SpinnerContainer } from "./with-spinner.styles";

//WithSpinner is a High Order Component that returns a new Functional Component
//if we use render instead component property we have to make sure to pass props down into our WrappedComponent
const WithSpinner = (WrappedComponent) => {
  const Spinner = ({ isLoading, ...otherProps }) => {
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

// const WithSpinner =
//   (WrappedComponent) =>
//   ({ isLoading, ...otherProps }) => {
//     return isLoading ? (
//       <SpinnerOverlay>
//         <SpinnerContainer />
//       </SpinnerOverlay>
//     ) : (
//       <WrappedComponent {...otherProps} />
//     );
//   };
