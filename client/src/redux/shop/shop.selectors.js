import { createSelector } from "reselect";

const selectShop = (state) => state.shop;

export const selectCollections = createSelector(
  [selectShop],
  (shop) => shop.collections
);

export const selectIsCollectionFetching = createSelector(
  [selectShop],
  (shop) => shop.isFetching
);

// !!null => false  or !! {} => true (converting into truthy or falsy values using double bang !!)
export const selectIsCollectionsLoaded = createSelector(
  [selectShop],
  (shop) => !!shop.collections
);

//converted SHOP_DATA (collections) state from an array of objects into object of objects so we cannot map it so we have to turn it into an array again
//Object.key(collections) => [hats,sneakers,jackets,...]

export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  (collections) =>
    collections ? Object.keys(collections).map((key) => collections[key]) : []
);

//this is currying  EXEMPLE :
//curriedMultiply = (a) => (b) => a*b
//curriedMultiply(5)(3); => 5*3 = 15

export const selectCollection = (collectionUrlParam) =>
  createSelector([selectCollections], (collections) =>
    collections ? collections[collectionUrlParam] : null
  );

//the concept of storing lists of elements inside of an object instead of an array

//object that maps the String value to the respective Id
//we use this because our collections id is a number but the collection parameter id is a string

// const COLLECTION_ID_MAP = {
//   hats: 1,
//   sneakers: 2,
//   jackets: 3,
//   womens: 4,
//   mens: 5,
// };
// export const selectCollection = memoize((collectionUrlParam) =>
//   createSelector([selectCollections], (collections) =>
//     collections.find(
//       (collection) => collection.id === COLLECTION_ID_MAP[collectionUrlParam]
//     )
//   )
// );
