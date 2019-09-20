import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Home extends Component {
	state = {
		counter: 0
	};

	render() {
		const { auth } = this.props;

		let user;
		// let friends;
		if (auth.isAuthenticate) {
			user = <h1>{auth.user.firstName}</h1>;
			// auth.user.friends.forEach(friends => {
			// 	<li>{friends}</li>;
			// })
			// friends = (
			// 	<div>
			// 		<h3>Friends list: </h3>
			// 		<ul>
			// 			<li>{auth.user.friends[0]}</li>
			// 		</ul>
			// 	</div>
			// );
		}

		return (
			<div>
				<h1 className="text-center">Chat-rooms</h1>
				<p>Members: {this.state.counter}</p>
				{user}
				{/* {friends} */}
				<button
					className="btn btn-info"
					onClick={() => {
						this.setState({ counter: this.state.counter + 1 });
					}}
				>
					Increment
				</button>
			</div>
		);
	}
}
Home.propTypes = {
	auth: PropTypes.object.isRequired,
	isAuthenticated: PropTypes.bool
};
const mapStateToProps = state => ({
	auth: state.auth,
	isAuthenticate: state.auth.isAuthenticate
});

export default connect(mapStateToProps)(Home);
