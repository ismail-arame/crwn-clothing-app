import React from "react";
import "./cart-dropdown.styles.scss";

import { connect } from "react-redux";

//High Order Component that takes a component and returns souped up version of it
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";

import CustomButton from "../custom-button/custom-button.component";
import CartItem from "../cart-item/cart-item.component";
import { toggleCartHidden } from "../../redux/cart/cart.actions";

//Memoization Library (Reselect)
import { createStructuredSelector } from "reselect";
import { selectCartItems } from "../../redux/cart/cart.selectors";

const CartDropdown = ({ cartItems, history, dispatch }) => (
  <div className="cart-dropdown">
    <div className="cart-items">
      {cartItems.length ? (
        cartItems.map((cartItem) => (
          <CartItem key={cartItem.id} item={cartItem} />
        ))
      ) : (
        <span className="empty-message">Your cart is empty</span>
      )}
    </div>
    <CustomButton
      onClick={() => {
        history.push("/checkout");
        dispatch(toggleCartHidden());
      }}
    >
      GO TO CHECKOUT
    </CustomButton>
  </div>
);

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
});

//connect passes dispatch into our Component Props if we do not supply a second argument to connect
export default withRouter(connect(mapStateToProps)(CartDropdown));
