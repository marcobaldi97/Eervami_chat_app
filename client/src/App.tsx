import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import SSRProvider from "react-bootstrap/SSRProvider";

import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import { Home } from "./pages/Home/Home";
import { DataStore } from "./core/DataStore";

function App() {
	DataStore.getInstance().setloggedUser("Alphonse");

	return (
		<SSRProvider>
			<div className="App">
				<Router>
					<Switch>
						<Route path="/">
							<Home loggedUser="Alphonse" />
						</Route>
					</Switch>
				</Router>
			</div>
		</SSRProvider>
	);
}

export default App;
