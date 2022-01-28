import React from "react";
import { ReactComponent as Logo } from "../../assets/084 crown.svg";

import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";

//Reselect Library for Memoization
import { selectCartHidden } from "../../redux/cart/cart.selectors";
import { selectCurrentUser } from "../../redux/user/user.selectors";

import { createStructuredSelector } from "reselect";

//connect is higher order component that let's us modify our component to have access to things related to redux
import { connect } from "react-redux";

import { signOutStart } from "../../redux/user/user.actions";

//Styled-Components :
import {
  HeaderContainer,
  LogoContainer,
  OptionsContainer,
  OptionLink,
} from "./header.styles";

//right now header component is getting currentUser from app.js and we don't want that, instead we wanna pul the currentUser value from the userReducer (connect())
const Header = ({ currentUser, hidden, signOutStart }) => (
  <HeaderContainer>
    <LogoContainer to="/">
      <Logo />
    </LogoContainer>
    <OptionsContainer>
      <OptionLink to="/shop">SHOP</OptionLink>
      <OptionLink to="/shop">CONTACT</OptionLink>
      {currentUser ? (
        <OptionLink as="div" onClick={signOutStart}>
          SIGN OUT
        </OptionLink>
      ) : (
        <OptionLink to="/signin">SIGN IN</OptionLink>
      )}
      <CartIcon />
    </OptionsContainer>
    {hidden ? null : <CartDropdown />}
  </HeaderContainer>
);

//naming can be anything but mapStateToProps is the standard redux codebases
//this function get the state object which is the top level rootReducer state
//we're going to return from that function an Object where the name of the property is the actual property we wanna pass in and then the value is the actual value

//this is how we bring our state props into our Components

//if we have 5 , 6 selectors => bad practice instead use createStructuredSelector
// const mapStateToProps = (state) => ({
//   currentUser: selectCurrentUser(state),
//   hidden: selectCartHidden(state),
// });

//createStructuredSelector will get the top level state of Redux and pass it to those selectors one by one
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden,
});

const mapDispatchToProps = (dispatch) => ({
  signOutStart: () => dispatch(signOutStart()),
});

//connect() => returns us another HOC (High Order Component) that we pass to it Header
//the first parameter of the first function is a function that allows us to access the state with the state being the rootReducer

export default connect(mapStateToProps, mapDispatchToProps)(Header);
