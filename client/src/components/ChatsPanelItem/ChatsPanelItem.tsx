import React from "react";
import { Container } from "react-bootstrap";

import "./ChatsPanelItem.styles.scss";

export function ChatsPanelItem(props: { name: string; onlineStatus: boolean; lastMessage: string }) {
	let { name, onlineStatus, lastMessage } = props;

	lastMessage = lastMessage.length > 256 ? (lastMessage = lastMessage.slice(0, 256) + "...") : lastMessage;

	return (
		<Container fluid className="chatsPanelItemContainer">
			<div className="metaInfo">
				<h4>{name}</h4>
				<h6 className={onlineStatus ? "online" : "disconnected"}>
					<div className={onlineStatus ? "onlineCircle" : "disconnectedCircle"}></div>
					{onlineStatus ? "Online" : "Disconnected"}
				</h6>
			</div>
			<h6>{lastMessage}</h6>
		</Container>
	);
}
