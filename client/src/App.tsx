import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import SSRProvider from "react-bootstrap/SSRProvider";

import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import { Home } from "./pages/Home/Home";

function App() {
	return (
		<SSRProvider>
			<div className="App">
				<Router>
					<Switch>
						<Route path="/">
							<Home />
						</Route>
					</Switch>
				</Router>
			</div>
		</SSRProvider>
	);
}

export default App;
