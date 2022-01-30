import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// import { connect } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";

import Header from "./components/header/header.component";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import CheckoutPage from "./pages/checkout/checkout.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";

import { selectCurrentUser } from "./redux/user/user.selectors";
import { checkUserSession } from "./redux/user/user.actions";

const App = () => {
  // const currentUser = useSelector((state) => console.log(state));
  //useSelector gets the Global state of Redux as parameter and returns slice of it
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, [dispatch]);

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
};

//and now that setCurrentUser will be in the App component Props
export default App;
