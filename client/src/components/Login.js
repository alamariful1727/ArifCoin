import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signInUser } from '../actions/auth.action';

class Login extends React.Component {
  state = {
    email: 'alamariful1727@gmail.com',
    password: 'Ariful@123',
  };

  onSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    // TODO: login validation

    // login user
    const user = {
      email,
      password,
    };
    console.log(user);
    this.props.signInUser(user);
    // check login

    // Clear State
    this.setState({
      email: '',
      password: '',
    });
    this.props.history.push('/');
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { email, password } = this.state;
    return (
      <div className="my-4">
        <Form onSubmit={this.onSubmit}>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={this.onChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={this.onChange}
            />
          </FormGroup>
          <Button>Login</Button>
        </Form>
      </div>
    );
  }
}

Login.propTypes = {
  signInUser: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  isAuthenticate: state.auth.isAuthenticate,
});
export default connect(
  mapStateToProps,
  { signInUser },
)(Login);
