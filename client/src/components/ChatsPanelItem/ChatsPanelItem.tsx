import React, { useCallback, useEffect, useState } from "react";
import { Container } from "react-bootstrap";

import { ApiStore } from "../../core/ApiStore";
import { DataStore } from "../../core/DataStore";

import "./ChatsPanelItem.styles.scss";

export interface chatsPanelItemProps {
	name: string;
	onClick: () => void;
}

export function ChatsPanelItem(props: chatsPanelItemProps) {
	let { name, onClick } = props;

	const [lastMessage, setLastMessage] = useState("");
	const [onlineStatus, setOnlineStatus] = useState(false);
	const [loading, setLoading] = useState(true);

	const apiStore = new ApiStore();
	const dataStore = DataStore.getInstance();

	const getLastMessage = useCallback(async () => {
		setLoading(true);

		const lstMsg = await apiStore.getLastMessage(
			dataStore.loggedUser ?? "",
			name
		);

		setLastMessage(lstMsg?.msg ?? "");

		setLoading(false);
	}, [setLoading, name, setLastMessage]);

	useEffect(() => {
		getLastMessage();
	}, [getLastMessage]);

	function limitMessage(message: string, limit: number = 256) {
		return message.length > limit
			? message.slice(0, limit) + "..."
			: message;
	}

	if (loading) return null;

	return (
		<Container fluid className="chatsPanelItemContainer" onClick={onClick}>
			<div className="metaInfo">
				<h4>{name}</h4>
				<h6 className={onlineStatus ? "online" : "disconnected"}>
					<div
						className={
							onlineStatus ? "onlineCircle" : "disconnectedCircle"
						}></div>
					{onlineStatus ? "Online" : "Disconnected"}
				</h6>
			</div>
			<h6>{limitMessage(lastMessage)}</h6>
		</Container>
	);
}
