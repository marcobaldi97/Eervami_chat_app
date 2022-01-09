import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import SSRProvider from "react-bootstrap/SSRProvider";

import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import { Home } from "./pages/Home/Home";
import { DataStore } from "./core/DataStore";
import { Login } from "./pages/Login/Login";
import { observer } from "mobx-react-lite";

export const App = observer(() => {
	const dataStore = DataStore.getInstance();
	return (
		<SSRProvider>
			<div className="App">
				<Router>
					{!dataStore.loggedUser && <Redirect to="/login" />}
					<Switch>
						<Route path="/login">
							<Login />
						</Route>
						<Route path="/">{dataStore.loggedUser ? <Home /> : <Redirect to="/login" />}</Route>
					</Switch>
				</Router>
			</div>
		</SSRProvider>
	);
});

export default App;
