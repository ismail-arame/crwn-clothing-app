//is going to be the Reducer tat will store the State of our CURRENT USER
//a Reducer is just a function that gets 2 properties (currentState, action)
//it gets the state object which represent the Last state or an Initial state and an action and that action ij just an object that has type which is a string (just name that tells us what specif action is this) and a payload which is any

//state is the currentState
//the state is going to be something that the redux store will pass to this reducer whenever an action fires and the state will be whatever the state is curently when that action gets fired

//when we fire the State for the first time it will be nothing because Redux doesn't know that we have any State when the app Initializes so when we fire an Action there will be no State

import userActionTypes from "./user.types";

//so we have to make sure to create an Initial State of this Reducer
const INITIAL_STATE = {
  currentUser: null,
  error: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  //now we return the actual state based on the action
  //one thing to remember is every single Reducer gets every single action that gets fired even if those actions are not related to that Reducer
  switch (action.type) {
    case userActionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        error: null,
      };
    //we never write it like this state.currentUser = action.payload
    //react doesn't re render components in that case look at my book (الاحتكار)

    case userActionTypes.SIGN_OUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
        error: null,
      };

    case userActionTypes.SIGN_IN_FAILURE:
    case userActionTypes.SIGN_UP_FAILURE:
    case userActionTypes.SIGN_OUT_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    default:
      //if that action's type doesn't match with Reducer we want to return the same state (it stays the same in that case)
      return state;
  }
}; // => { currentUser: { ... } }

export default userReducer;
