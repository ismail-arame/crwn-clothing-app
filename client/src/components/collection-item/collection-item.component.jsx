import React from "react";
import "./collection-item.styles.scss";

import CustomButton from "../custom-button/custom-button.component";
import { connect } from "react-redux";
import { addItem } from "../../redux/cart/cart.actions";

//now we have access to addItem in our Props (beacause mapDispatchToProps)
const CollectionItem = ({ item, addItem }) => {
  const { price, name, imageUrl } = item;
  return (
    <div className="collection-item">
      <div className="image" style={{ backgroundImage: `url(${imageUrl})` }} />
      <div className="collection-footer">
        <span className="name">{name}</span>
        <span className="price">
          <strong>$</strong>
          {price}
        </span>
      </div>
      <CustomButton
        className="custom-button"
        onClick={() => addItem(item)}
        inverted
      >
        Add To Cart
      </CustomButton>
    </div>
  );
};

//changing the state whenever an ADD_ITEM Action fires (reducer listents to that action and if it does match then the state will be changed)
//item is the payload to push into the cartItems Property array
const mapDispatchToProps = (dispatch) => ({
  addItem: (item) => dispatch(addItem(item)),
});

export default connect(null, mapDispatchToProps)(CollectionItem);
