import styled, { css } from "styled-components";

const buttonStyles = css`
  background-color: black;
  color: white;
  border: none;

  &:hover {
    background-color: white;
    color: black;
    border: 1px solid black;
  }
`;

const googleSignInStyles = css`
  background-color: #4285f4;
  &:hover {
    background-color: white;
    color: #4285f4;
    border: 1px solid #4285f4;
  }
`;

const invertedButtonStyles = css`
  background-color: white;
  color: black;
  border: 1px solid black;

  &:hover {
    background-color: black;
    color: white;
    border: none;
  }
`;

const getButtonStyles = (props) => {
  if (props.isGoogleSignIn) {
    return googleSignInStyles;
  } else {
    return props.inverted ? invertedButtonStyles : buttonStyles;
  }
};

export const CustomButtonContainer = styled.button`
  min-width: 165px;
  width: auto;
  height: 50px;
  letter-spacing: 0.5px;
  line-height: 50px;
  padding: 0 35px 0 35px;
  font-size: 15px;
  color: white;
  border: none;
  text-transform: uppercase;
  font-family: "Open Sans Condensed";
  font-weight: bolder;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.14s;
  display: flex;
  justify-content: center;

  ${getButtonStyles}
`;
