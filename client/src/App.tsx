import React from "react";
import logo from "./logo.svg";

import SSRProvider from "react-bootstrap/SSRProvider";

import "./App.css";
import { Chat } from "./components/Chat/Chat";

function App() {
	return (
		<SSRProvider>
			<div className="App">
				<Chat myUser="Albert" associate={{ name: "Barbara", onlineStatus: true }} />
			</div>
		</SSRProvider>
	);
}

export default App;
