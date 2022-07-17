import React from "react";

import "./ChatsPanel.styles.scss";

import { DataStore } from "../../core/DataStore";

import { Container } from "react-bootstrap";
import { ChatsPanelItem } from "../ChatsPanelItem/ChatsPanelItem";
import { UserTitle } from "../UserTitle/UserTitle";

interface ChatsPanelProps {
	myUser: string;
	friends: any[];
}

export function ChatsPanel(props: ChatsPanelProps) {
	const { myUser, friends } = props;

	const dataStore = DataStore.getInstance();

	return (
		<Container fluid className="chatsPanelContainer">
			<UserTitle username={myUser} image="" />

			{friends.map((friend, index) => (
				<ul>
					<ChatsPanelItem
						key={`chat-panel-item-${index}`}
						name={friend.user2}
						onClick={() =>
							dataStore.setSelectedFriend(friend.user2)
						}
					/>
				</ul>
			))}
		</Container>
	);
}
