import React from "react";
import "./collection.styles.scss";

// import CollectionsOverview from "../../components/collections-overview/collections-overview.component";

import CollectionItem from "../../components/collection-item/collection-item.component";

import { connect } from "react-redux";
import { selectCollection } from "../../redux/shop/shop.selectors";

//we have CollectionPage is nested inside a Route (ShopPage) so match and history and location are pased to it as Props
const CollectionPage = ({ match, collection }) => {
  // we have access to categoryId on our params Property
  //based on that match.params.collectionId we wanna get the right collection item
  // console.log(match);
  // console.log(collection);
  const { title, items } = collection;
  return (
    <div className="collection-page">
      <h2 className="title">{title.toUpperCase()}</h2>
      <div className="items">
        {items.map((item) => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

//in orderfor us to do this in our mapStateToProps properly we have to use the second optional Parameter
//the second argument is the props of our component that we are wrapping in our  connect

//this is currying  EXEMPLE :
//curriedMultiply = (a) => (b) => a*b
//curriedMultiply(5)(3); => 5*3 = 15
//selectCollection is a function that returns a new function
const mapStateToProps = (state, ownProps) => ({
  collection: selectCollection(ownProps.match.params.collectionId)(state),
});

export default connect(mapStateToProps)(CollectionPage);
