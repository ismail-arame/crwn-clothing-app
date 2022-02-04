import React from "react";
import "./collection.styles.scss";

import CollectionItem from "../../components/collection-item/collection-item.component";

import { useParams } from "react-router-dom";

// import { connect } from "react-redux";
import { useSelector } from "react-redux";
import { selectCollection } from "../../redux/shop/shop.selectors";

import memoize from "lodash.memoize";

//we have CollectionPage is nested inside a Route (ShopPage) so match and history and location are pased to it as Props
const CollectionPage = ({ match }) => {
  // we have access to categoryId on our params Property
  //based on that match.params.collectionId we wanna get the right collection item
  const params = useParams();
  console.log(params.collectionId);

  //memoizing
  //Memoize does the same idea of memoization as reselect does for our selectors, except this time we're memoizing the return of our function which returns our selector:
  const memoizedSelectCollection = memoize(selectCollection);

  // const collection = useSelector(selectCollection(match.params.collectionId));
  const collection = useSelector(memoizedSelectCollection(params.collectionId));
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

// const mapStateToProps = (state, ownProps) => ({
//   collection: selectCollection(ownProps.match.params.collectionId)(state),
// });

export default CollectionPage;
