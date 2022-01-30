//the root reducer is the base reducer object that represent the actual code that combines all of our other states together

//so this reducer will end up being the actual code that combines all of our other states together

//in order to combine all the Reducers inside the root Reducer
import { combineReducers } from "redux";
import userReducer from "./user/user.reducer";
import cartReducer from "./cart/cart.reducer";
import directoryReducer from "./directory/directory.reducer";
import shopReducer from "./shop/shop.reducer";

//after persisting the store now we need to persist the reducer
import { persistReducer } from "redux-persist";

//using localStorage as default storage
import storage from "redux-persist/lib/storage";
// import sessionStorage from "redux-persist/lib/storage/session";

//key is at what point inside our Reducer Object we wanna start storing everything
//whitelist is an array of string names of any of the reducer that we wanna store
//user is handled by firebase so we will pass only cart to our whitelist
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};

//our full State in redux is just one Big JSON Object and it's bound with all Redux Functionnality
//user is the Key that represents the Slice of State userReducer

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  directory: directoryReducer,
  shop: shopReducer,
});

//returning a modified version of our root Reducer
export default persistReducer(persistConfig, rootReducer);
