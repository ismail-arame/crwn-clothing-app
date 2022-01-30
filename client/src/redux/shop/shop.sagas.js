//takeEvery listens for every action of a specific type that we pass to it
import { all, call, put, takeLatest } from "redux-saga/effects";

import { shopActionTypes } from "./shop.types";

import {
  firestore,
  convertCollectionsSnapshotToMap,
} from "../../firebase/firebase.utils";

import {
  fetchCollectionsFailure,
  fetchCollectionsSuccess,
} from "./shop.actions";

//generator functions
export function* fetchCollectionsAsync() {
  try {
    yield console.log("I am fired");
    const collectionRef = firestore.collection("collections");
    const snapshot = yield collectionRef.get();

    //we use the call effect because we want to yeild this in case this call takes longer than we expect
    //because we're yielding this call, it allows us again to defer control at this point of the execution back to the Saga Middleware
    const collectionsMap = yield call(
      convertCollectionsSnapshotToMap,
      snapshot
    );
    //   const collectionsMap = convertCollectionsSnapshotToMap(snapshot);

    //put is the Saga effect for creating actions (like dispatch but we add yield)
    yield put(fetchCollectionsSuccess(collectionsMap));
  } catch (error) {
    //put: puts things back into our regular Redux Flow
    yield put(fetchCollectionsFailure(error.message));
  }
}

export function* fetchCollectionsStart() {
  //saga is going to pause whenever a specific action type that we want comes in
  yield takeLatest(
    shopActionTypes.FETCH_COLLECTIONS_START,
    fetchCollectionsAsync
  );
}

export function* shopSagas() {
  yield all([call(fetchCollectionsStart)]);
}

// collectionRef
// .get()
// .then((snapshot) => {
//   console.log("i am fetching");
//   //collections Map is an Object of Objects where the key is the name of categories (hats, jackets, sneakers, mens, ...)
//   const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
//   dispatch(fetchCollectionsSuccess(collectionsMap));
// })
// .catch((error) => dispatch(fetchCollectionsFailure(error.message)));
