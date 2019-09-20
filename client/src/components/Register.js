import React from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../actions/auth.action";

class Register extends React.Component {
	state = {
		firstName: "",
		lastName: "",
		email: "",
		contactNo: "",
		password: "",
		confirmPassword: "",
		role: "user"
	};

	onSubmit = e => {
		e.preventDefault();
		const {
			firstName,
			lastName,
			email,
			password,
			confirmPassword,
			contactNo
		} = this.state;
		// TODO: Register validation

		// Register user
		const user = {
			firstName,
			lastName,
			email,
			password,
			confirmPassword,
			contactNo
		};
		console.log(user);
		this.props.registerUser(user);
		// check Register

		// Clear State
		this.setState({
			firstName: "",
			lastName: "",
			email: "",
			contactNo: "",
			password: "",
			confirmPassword: ""
		});
		this.props.history.push("/");
	};

	onChange = e => this.setState({ [e.target.name]: e.target.value });
	render() {
		const {
			firstName,
			lastName,
			email,
			password,
			confirmPassword,
			contactNo
		} = this.state;
		return (
			<div className="my-4">
				<Form onSubmit={this.onSubmit}>
					<FormGroup>
						<Label for="firstName">First Name</Label>
						<Input
							type="text"
							name="firstName"
							id="firstName"
							placeholder="Enter your first name"
							value={firstName}
							onChange={this.onChange}
						/>
					</FormGroup>
					<FormGroup>
						<Label for="lastName">Last Name</Label>
						<Input
							type="text"
							name="lastName"
							id="lastName"
							placeholder="Enter your last name"
							value={lastName}
							onChange={this.onChange}
						/>
					</FormGroup>
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
					<FormGroup>
						<Label for="confirmPassword">Confirm Password</Label>
						<Input
							type="password"
							name="confirmPassword"
							id="confirmPassword"
							placeholder="Confirm password"
							value={confirmPassword}
							onChange={this.onChange}
						/>
					</FormGroup>
					<FormGroup>
						<Label for="contactNo">Contact Number</Label>
						<Input
							type="text"
							name="contactNo"
							id="contactNo"
							placeholder="Enter your Contact Number"
							value={contactNo}
							onChange={this.onChange}
						/>
					</FormGroup>
					<Button>Register</Button>
				</Form>
			</div>
		);
	}
}

Register.propTypes = {
	registerUser: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
	isAuthenticate: state.auth.isAuthenticate
});
export default connect(
	mapStateToProps,
	{ registerUser }
)(Register);
