import React from "react";

import { CustomButtonContainer } from "./custom-button.styles";

//inverted is the styling of the button in the collectionItem Component
//destructuring props
const CustomButton = ({ children, ...props }) => (
  <CustomButtonContainer {...props}>{children}</CustomButtonContainer>
);

export default CustomButton;
