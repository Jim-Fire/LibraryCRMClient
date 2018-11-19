import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { authorizate, setUnauthorizated } from "../actions/authActions";
import AuthTemplate from "../templates/AuthTemplate";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

export class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: "",
      password: ""
    };
    this.handleSignIn = this.handleSignIn.bind(this);
  }

  componentDidMount() {
    this.props.setUnauthorizated(false);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.token) {
      console.log("Redirecting to Main page...");
      setTimeout(() => {
        this.props.history.push("/main");
      }, 100);
    }
  }
  handleSignIn(e) {
    e.preventDefault();
    this.props.authorizate({
      login: this.state.login,
      password: this.state.password
    });
  }
  render() {
    return (
      <AuthTemplate>
        <Form className="auth-form">
          <FormGroup>
            <Label for="exampleEmail">Email</Label>
            <Input
              type="email"
              name="email"
              id="exampleEmail"
              placeholder="Your email"
              onChange={e => {
                this.setState({ login: e.target.value });
              }}
              value={this.state.login}
            />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Password</Label>
            <Input
              type="password"
              name="password"
              id="examplePassword"
              placeholder="Your password..."
              onChange={e => {
                this.setState({ password: e.target.value });
              }}
              value={this.state.password}
            />
          </FormGroup>
          <FormGroup>
            <Label>Not Registered?</Label>
            <br />
            <Link to="/sign-up">Create an accaunt</Link>
          </FormGroup>
          <Button onClick={this.handleSignIn}>Sign in</Button>
        </Form>
      </AuthTemplate>
    );
  }
}
const mapStateToProps = state => ({
  token: state.auth.token
});

export default connect(
  mapStateToProps,
  { authorizate, setUnauthorizated }
)(SignIn);
