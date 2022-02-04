import React, { useEffect, lazy, Suspense } from "react";
import { Route } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectCollections } from "../../redux/shop/shop.selectors";

import { connect } from "react-redux";
import { fetchCollectionsStart } from "../../redux/shop/shop.actions";

import Spinner from "../../components/spinner/spinner.component";
import ErrorBoundary from "../../components/error-boundary/error-boundary.component";

//Code Splitting
const CollectionsOverviewContainer = lazy(() =>
  import("../../components/collections-overview/collections-overview.container")
);
const CollectionPageContainer = lazy(() =>
  import("../collection/collection.container")
);

//we have ShopPage is nested inside a Route (App) so match and history and location are passed to it as Props

//we're going to tell our Route that the RouteName is going to be a parameter =>  shop/:category
//so we want to access the string in our URL to know which category to fetch
const ShopPage = ({ fetchCollectionsStart, match }) => {
  //useEffect as ComponentDidMount (if we pass empty array we will get a warning missing dependncy fetchCollectionsStart)
  const collections = useSelector(selectCollections);

  useEffect(() => {
    if (!collections) fetchCollectionsStart();
  }, [fetchCollectionsStart]);

  //we dont wanna hardcode /shop to make it more flexible if we want to reuse it in another place this is why we used  path={`${match.path}`}
  //what this does is it allows us to access this categoryId as a Parameter on the match Object
  //if we use render instead component property we have to make sure to pass props (match, history, location) down into our component (Obligation)
  return (
    <div className="shop-page">
      <ErrorBoundary>
        <Suspense fallback={<Spinner />}>
          <Route
            exact
            path={`${match.path}`}
            component={CollectionsOverviewContainer}
          />
          <Route
            path={`${match.path}/:collectionId`}
            component={CollectionPageContainer}
          />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart()),
});

export default connect(null, mapDispatchToProps)(ShopPage);

// fetch(
//   "https://firestore.googleapis.com/v1/projects/crwn-db-1cdee/databases/(default)/documents/collections"
// )
//   .then((response) => response.json())
//   .then((collections) => console.log(collections));
