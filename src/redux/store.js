//adding middleware to our store so whenever an action gets fired or dispatched we can catch them and display them
import { createStore, applyMiddleware } from "redux";

//now what this does is it allows our browser to cache our store now depending on certain configuration options that we're going to set
import { persistStore } from "redux-persist";

import logger from "redux-logger";

import rootReducer from "./root-reducer";
// import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
// import { fetchCollectionsStart } from "./shop/shop.sagas";
import rootSaga from "./root-saga";

const sagaMiddleware = createSagaMiddleware();

//we can do this directly without spreding the logger but it's not scalable
// const store = createStore(rootReducer, applyMiddleware(logger));

//the middleware that the store is expecting from redux is an array and this way if we ever needed to add something to the middleware we can just add it to middlewares variable
//so this is why we are doing it in this syntax because it is more scalable
// const middlewares = [logger];

//to remove logger from console if we are on a Production Envirenement
const middlewares = [sagaMiddleware];

if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}

//using store and persistor we'll create our provider wrapping our application
export const store = createStore(rootReducer, applyMiddleware(...middlewares));

//inside run we pass each individual saga that we write
sagaMiddleware.run(rootSaga);

//this a persistent version of our store
export const persistor = persistStore(store);

//bringing store and passing it into Provider Component in the index.js file
// export default { store, persistor };
