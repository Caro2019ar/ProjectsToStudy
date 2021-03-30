import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./common/form";

class LoginForm extends Form {
	state = {
		data: { username: "", password: "" },
		errors: {},
	};

	schema = {
		username: Joi.string().required().label("Username"),
		password: Joi.string().required().label("Password"),
	};
	// const schema = Joi.object({	username: Joi.string().required().label("Username"),
	// 	password: Joi.string().required().label("Password")});

	doSubmit = () => {
		console.log("submitted");
	};

	render() {
		return (
			<div>
				<h1>Login</h1>
				<form onSubmit={this.handleSubmit}>
					{this.renderInput("username", "Username")}
					{this.renderInput("password", "Password", "password")}
					{this.renderButton("Login")}
				</form>
			</div>
		);
	}
}

export default LoginForm;

// Se não colocar username ou colocar com valor inicial "username: null/undefined" vai dar erro no sistema, pq quando ele tentar acessar account.username no VALUE no INPUT vai dar erro
