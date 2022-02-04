import React from "react";

import {
  ErrorImageOverlay,
  ErrorImageText,
  ErrorImageContainer,
} from "./error-boundary.styles";

//A class component becomes an error boundary if it defines either (or both) of the lifecycle methods static getDerivedStateFromError() or componentDidCatch(). Use static getDerivedStateFromError() to render a fallback UI after an error has been thrown. Use componentDidCatch() to log error information.
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      //to know if any of the child components of ErrorBoundary have an error or not
      hasError: false,
    };
  }
  //catch errors from the child components and pass it as a parameter to static getDerivedStateFromError()
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  //info => which component throw the error (which one broke)
  componentDidCatch(error, info) {
    console.log(error);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <ErrorImageOverlay>
          <ErrorImageContainer imageUrl="https://i.imgur.com/yW2W9SC.png" />
          <ErrorImageText>
            Sorry this page is broken Try to refresh the page
          </ErrorImageText>
        </ErrorImageOverlay>
      );
    }

    //if no Error occur then childrens will render normally
    return this.props.children;
  }
}

export default ErrorBoundary;
