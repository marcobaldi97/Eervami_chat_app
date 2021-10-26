import React from "react";
import "./ChatsPanel.styles.scss";

import { Container } from "react-bootstrap";

export function ChatsPanel(props: { myUser: string; associates: { name: string; onlineStatus: boolean }[] }) {
	function printChats(myUser: string, associates: { name: string; onlineStatus: boolean }[]) {
		return associates.map((associate) => {
			const lastMessage = "";

			return (
				<div className="chat-container">
					<h4>{associate.name}</h4>
					<h6>{associate.onlineStatus}</h6>
					<h5>{lastMessage}</h5>
				</div>
			);
		});
	}

	return (
		<Container fluid className="chatsPanelContainer">
			<ul>{printChats(props.myUser, props.associates)}</ul>
		</Container>
	);
}
