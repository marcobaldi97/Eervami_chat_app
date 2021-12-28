import React from "react";

import "./Home.styles.scss";

import { Chat } from "../../components/Chat/Chat";
import { ChatsPanel } from "../../components/ChatsPanel/ChatsPanel";

import { Container } from "react-bootstrap";

export function Home() {
	return (
		<Container fluid className="homeContainer">
			<ChatsPanel
				myUser={"Albert"}
				associates={[
					{ name: "Barbara", onlineStatus: true },
					{ name: "Charles", onlineStatus: false },
				]}
			/>
			<div>
				<Chat myUser="Albert" associate={{ name: "Barbara", onlineStatus: true }} />
			</div>
		</Container>
	);
}
