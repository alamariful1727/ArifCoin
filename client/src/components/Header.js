import React from "react";
import { Link } from "react-router-dom";
import { Collapse, Navbar, NavbarToggler, Nav, NavItem } from "reactstrap";
import { connect } from "react-redux";

class Header extends React.Component {
	static defaultProps = {
		title: "Chat-App"
	};
	state = {
		isOpen: false
	};
	toggle = () => {
		this.setState({
			isOpen: !this.state.isOpen
		});
	};

	render() {
		let loggedNav;
		if (this.props.isAuthenticate) {
			loggedNav = (
				<>
					<NavItem>
						<Link className="nav-link" to="/tigrow">
							TiGrow
						</Link>
					</NavItem>
					<NavItem>
						<Link className="nav-link" to="/logout">
							Logout
						</Link>
					</NavItem>
				</>
			);
		} else {
			loggedNav = (
				<>
					<NavItem>
						<Link className="nav-link" to="/login/">
							Login
						</Link>
					</NavItem>
					<NavItem>
						<Link className="nav-link" to="/register/">
							Register
						</Link>
					</NavItem>
				</>
			);
		}
		return (
			<div>
				<Navbar color="dark" dark expand="md">
					<div className="container">
						<Link to="/" className="navbar-brand">
							{this.props.title}
						</Link>
						<NavbarToggler onClick={this.toggle} />
						<Collapse isOpen={this.state.isOpen} navbar>
							<Nav className="ml-auto" navbar>
								{loggedNav}
							</Nav>
						</Collapse>
					</div>
				</Navbar>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	isAuthenticate: state.auth.isAuthenticate
});

export default connect(mapStateToProps)(Header);
