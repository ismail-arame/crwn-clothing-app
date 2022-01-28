import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import App from "./App";

import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";

//Provider is the Component class we get from react-redux once we pass the store object we'll be able to give that store context to te rest of the application
//we can dispatch actions to that store or we can pull values from the store into our Components and all comes from our Provider Component
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
