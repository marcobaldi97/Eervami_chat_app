import React from "react";
import { Redirect } from "react-router-dom";

import { ApiStore } from "../../core/ApiStore";
import { DataStore } from "../../core/DataStore";

import "./Login.styles.scss";

export interface LoginProps {}

export const Login = (props: LoginProps) => {
	const apiStore = new ApiStore();
	const dataStore = DataStore.getInstance();

	const [username, setUsername] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [error, setError] = React.useState("");
	const [redirect, setRedirect] = React.useState(false);

	React.useEffect(() => {
		if (error || error !== "") {
			setTimeout(() => {
				setError("");
			}, 3000);
		}
	}, [error]);

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const response = await apiStore.login(username, password);

		if (response) setRedirect(true);
		else setError("Invalid username or password");
	}

	return (
		<div className="loginContainer">
			{redirect && <Redirect to="/" />}
			<h1>Login</h1>
			<form className="loginForm" onSubmit={handleSubmit}>
				<div>
					<label> Username: </label>
					<input type="text" name="username" placeholder="Username" onChange={(event) => setUsername(event.target.value)} />
				</div>
				<div>
					<label> Password: </label>
					<input type="password" name="password" placeholder="Password" onChange={(event) => setPassword(event.target.value)} />
				</div>
				<input className="submitButton" type="submit" value="Login" />
				<h4 className="errorMessage">{error}</h4>
			</form>
		</div>
	);
};
