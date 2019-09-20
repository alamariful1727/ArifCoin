import React, { Component } from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Register from "./components/Register";
import Tigrow from "./components/Tigrow";
import { Provider } from "react-redux";
import { store } from "./store";
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect
} from "react-router-dom";
import { loadUser } from "./actions/auth.action";
import { isLogged } from "./actions/authHelper";

// private route
class PrivateRoute extends Component {
	render() {
		const Component = this.props.component;
		return (
			<Route
				path={this.props.path}
				exact
				render={r => (isLogged() ? <Component /> : <Redirect to="/login" />)}
			/>
		);
	}
}

class App extends Component {
	componentDidMount() {
		store.dispatch(loadUser());
	}
	render() {
		return (
			<Provider store={store}>
				<Router>
					<Header />
					<div className="container">
						<Switch>
							<Route path="/" exact component={Home} />
							<Route path="/login" component={Login} />
							<Route path="/register" component={Register} />
							<Route path="/logout" component={Logout} />
							<PrivateRoute path="/tigrow" exact component={Tigrow} />
						</Switch>
					</div>
				</Router>
			</Provider>
		);
	}
}

export default App;
