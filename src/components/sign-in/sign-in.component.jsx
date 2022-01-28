import React from "react";
import "./sign-in.styles.scss";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../../components/custom-button/custom-button.component";

import { connect } from "react-redux";
import {
  googleSignInStart,
  emailSignInStart,
} from "../../redux/user/user.actions";

class SignIn extends React.Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { emailSignInStart } = this.props;
    const { email, password } = this.state;

    emailSignInStart({ email, password });
    // try {
    //   await auth.signInWithEmailAndPassword(email, password);
    //   this.setState({ email: "", password: "" });
    // } catch (error) {
    //   console.log("***AUTHENTICATION ERROR***", error.message);
    //   alert("email or password are incorrect");
    // }
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    //[] is an ES6 feature that lets us define the a variable key
    this.setState({ [name]: value });
  };
  render() {
    const { googleSignInStart } = this.props;
    return (
      <div className="sign-in">
        <h2 className="title">I already have an account</h2>
        <span>Sign in with your email and password</span>
        <form onSubmit={this.handleSubmit}>
          <FormInput
            name="email"
            type="email"
            value={this.state.email}
            handleChange={this.handleChange}
            label="Email"
            required
          />
          <FormInput
            name="password"
            type="password"
            value={this.state.password}
            handleChange={this.handleChange}
            label="Password"
            required
          />
          <div className="buttons">
            <CustomButton type="submit">SIGN IN</CustomButton>
            <CustomButton
              type="button"
              onClick={googleSignInStart}
              isGoogleSignIn
            >
              SIGN IN WITH GOOGLE
            </CustomButton>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (emailAndPassword) =>
    dispatch(emailSignInStart(emailAndPassword)),
});

export default connect(null, mapDispatchToProps)(SignIn);
