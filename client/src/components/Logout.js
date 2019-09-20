import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "./../actions/auth.action";

class Logout extends Component {
	constructor(props) {
		super(props);
		this.props.logoutUser();
		this.props.history.push("/");
	}
	render() {
		return <div></div>;
	}
}
Logout.propTypes = {
	logoutUser: PropTypes.func.isRequired
};

export default connect(
	null,
	{ logoutUser }
)(Logout);
