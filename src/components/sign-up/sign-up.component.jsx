import React from "react";
import "./sign-up.styles.scss";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import { signUpStart } from "../../redux/user/user.actions";
import { connect } from "react-redux";

class SignUp extends React.Component {
  constructor() {
    super();

    this.state = {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const { signUpStart } = this.props;
    const { displayName, email, password, confirmPassword } = this.state;
    if (password !== confirmPassword) {
      alert("password don't match");
      this.setState({
        password: "",
        confirmPassword: "",
      });
      return;
    }
    signUpStart({ displayName, email, password });
    // try {
    //   //this function (createUserWithEmailAndPassword) returns THE user Object that we pass into onAuthStateChanged function
    //   //hover on createUserWithEmailAndPassword to see more info about it
    //   const { user } = await auth.createUserWithEmailAndPassword(
    //     email,
    //     password
    //   );

    //   //display name is the additionalData parameter in createUserProfileDocument fun
    //   await createUserProfileDocument(user, { displayName });

    //   // this.setState({
    //   //   displayName: "",
    //   //   email: "",
    //   //   password: "",
    //   //   confirmPassword: "",
    //   // });
    // } catch (error) {
    //   console.log(error.message);
    // }
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    // console.log(name, value);
    this.setState({ [name]: value });
  };

  render() {
    const { displayName, email, password, confirmPassword } = this.state;
    return (
      <div className="sign-up">
        <h2 className="title">I do not have an account</h2>
        <span>Sign up with your email and password</span>
        <form onSubmit={this.handleSubmit}>
          <FormInput
            type="text"
            name="displayName"
            value={displayName}
            label="Display Name"
            onChange={this.handleChange}
            required
          />
          <FormInput
            type="email"
            name="email"
            value={email}
            label="Email"
            onChange={this.handleChange}
            required
          />
          <FormInput
            type="password"
            name="password"
            value={password}
            label="Password"
            onChange={this.handleChange}
            required
          />
          <FormInput
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            label="Confirm Password"
            onChange={this.handleChange}
            required
          />
          <CustomButton type="submit">SIGN UP</CustomButton>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  signUpStart: (userCredentials) => dispatch(signUpStart(userCredentials)),
});

export default connect(null, mapDispatchToProps)(SignUp);
