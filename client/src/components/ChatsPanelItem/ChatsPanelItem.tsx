import React from "react";
import { Container } from "react-bootstrap";

import "./ChatsPanelItem.styles.scss";

export interface chatsPanelItemProps {
	name: string;
	onlineStatus: boolean;
	lastMessage: string;
	onClick: () => void;
}

export function ChatsPanelItem(props: chatsPanelItemProps) {
	let { name, onlineStatus, lastMessage, onClick } = props;

	lastMessage = lastMessage.length > 256 ? (lastMessage = lastMessage.slice(0, 256) + "...") : lastMessage;

	return (
		<Container fluid className="chatsPanelItemContainer" onClick={onClick}>
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
