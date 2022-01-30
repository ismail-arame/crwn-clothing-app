import React from "react";
import "./cart-dropdown.styles.scss";

// import { connect } from "react-redux";
import { useSelector, useDispatch } from "react-redux";

//High Order Component that takes a component and returns souped up version of it
// import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import { useHistory } from "react-router-dom";

import CustomButton from "../custom-button/custom-button.component";
import CartItem from "../cart-item/cart-item.component";
import { toggleCartHidden } from "../../redux/cart/cart.actions";

//Memoization Library (Reselect)
import { selectCartItems } from "../../redux/cart/cart.selectors";

const CartDropdown = () => {
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const history = useHistory();

  return (
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
};

export default CartDropdown;

// export default withRouter(CartDropdown);
