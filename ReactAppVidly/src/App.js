import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Customers from "./components/customers";
import MovieForm from "./components/movieForm";
import Rentals from "./components/rentals";
import Movies from "./components/Movies";
import NotFound from "./components/notfound";
import NavBar from "./components/navbar";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
// import MovieNew from "./components/movieNew";
import "./App.css";

class App extends Component {
	render() {
		return (
			<div>
				<NavBar />
				<div className="container">
					<Switch>
						{/* <Route path="/movies/new" component={MovieNew} /> */}
						<Route path="/register" component={RegisterForm} />
						<Route path="/login" component={LoginForm} />
						<Route path="/movies/:id" component={MovieForm} />
						<Route path="/movies" component={Movies} />
						<Route path="/customers" component={Customers} />
						<Route path="/rentals" component={Rentals} />
						<Route path="/not-found" component={NotFound} />
						<Redirect from="/" exact to="/movies" />
						<Redirect to="not-found" />
					</Switch>
				</div>
			</div>
		);
	}
}
export default App;
