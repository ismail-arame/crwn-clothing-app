//Container Pattern
import { compose } from "redux";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectIsCollectionFetching } from "../../redux/shop/shop.selectors";

import CollectionsOverview from "./collections-overview.component";

import WithSpinner from "../../components/with-spinner/with-spinner.component";

//property name should be the same WithSpinner is expecting
//because in WithSpinner HOC we destructered from props isLoding
const mapStateToProps = createStructuredSelector({
  isLoading: selectIsCollectionFetching,
});

//compose evaluates from right to left :
//first it will give CollectionsOverview to WithSpinner =>
//WithSpinner(CollectionsOverview)
//second it will pass it to connect
//connect(mapStateToProps)(WithSpinner(CollectionsOverview))
const CollectionsOverviewContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(CollectionsOverview);

export default CollectionsOverviewContainer;

//same thing as compose but hard to read
// const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
// const CollectionsOverviewContainer = connect(mapStateToProps)(
//   CollectionsOverviewWithSpinner
// );
