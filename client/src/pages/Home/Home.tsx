import React from "react";

import "./Home.styles.scss";

import { Chat } from "../../components/Chat/Chat";
import { ChatsPanel } from "../../components/ChatsPanel/ChatsPanel";

import { Container, Row, Col } from "react-bootstrap";

export function Home() {
	return (
		<Container fluid className="homeContainer">
			<div>
				<ChatsPanel
					myUser={"Albert"}
					associates={[
						{ name: "Barbara", onlineStatus: true },
						{ name: "Charles", onlineStatus: false },
					]}
				/>
			</div>
			<div>
				<Chat myUser="Albert" associate={{ name: "Barbara", onlineStatus: true }} />
			</div>
		</Container>
	);
}
