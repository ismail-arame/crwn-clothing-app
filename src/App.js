import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { connect } from "react-redux";
import "./App.css";

import Header from "./components/header/header.component";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import CheckoutPage from "./pages/checkout/checkout.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";

import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "./redux/user/user.selectors";
import { checkUserSession } from "./redux/user/user.actions";

class App extends React.Component {
  //when we call onAuthStateChanged function it returns a function to you that unsubscribes the function you originally gave it. To be clear, it does not return your original function (the one you gave it), but returns you a new function that can be used to remove the original.

  unsubscribeFromAuth = null;

  componentDidMount() {
    const { checkUserSession } = this.props;
    checkUserSession();
    // this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
    //   //check userAuth status
    //   if (userAuth) {
    //     // storing userAuth data in the DATABASE
    //     const userRef = await createUserProfileDocument(userAuth);
    //     //the same onAuthStateChanged we're saying if the snapShot has changed but if it doesn't change it retuns the first snapShot
    //     userRef.onSnapshot((snapShot) => {
    //       setCurrentUser({
    //         id: snapShot.id,
    //         ...snapShot.data(),
    //       });
    //     });
    //   } else {
    //     //now the userAuth parameter is the payload
    //     setCurrentUser(userAuth); //null
    //     // this.setState({ currentUser: userAuth });
    //   }
    // });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    const { currentUser } = this.props;
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route
            exact
            path="/signin"
            render={() =>
              currentUser ? <Redirect to="/" /> : <SignInAndSignUpPage />
            }
          />
          <Route path="/checkout" component={CheckoutPage} />
        </Switch>
      </div>
    );
  }
}

//we need the currentUser from the Redux State
// we have just destructured the state ||| => { user } = state.user

// we used createStructuredSelector for future if we wanna add other selectors
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession()),
});

//and now that setCurrentUser will be in the App component Props
export default connect(mapStateToProps, mapDispatchToProps)(App);
