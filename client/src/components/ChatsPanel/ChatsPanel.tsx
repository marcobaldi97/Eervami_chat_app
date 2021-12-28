import React from "react";

import axios from "axios";

import "./ChatsPanel.styles.scss";

import { Container } from "react-bootstrap";
import { ChatsPanelItem } from "../ChatsPanelItem/ChatsPanelItem";
import { FriendStatus } from "../../pages/Home/Home";
import { ApiStore } from "../../core/ApiStore";

interface ChatsPanelProps {
	myUser: string;
	associates: FriendStatus[];
	onClick: (clickedFriend: FriendStatus) => void;
}

export function ChatsPanel(props: ChatsPanelProps) {
	const apiStore = new ApiStore();

	const { myUser, associates, onClick } = props;
	const [chatPanelItems, setChatPanelItems] = React.useState<any[]>([]);

	React.useEffect(() => {
		try {
			printChats(myUser, associates);
		} catch (error) {
			console.error(error);
		}
	}, []);

	async function printChats(myUser: string, associates: { name: string; onlineStatus: boolean }[]) {
		const itemsToRender = associates.map((associate, index) => {
			const participant1 = myUser;
			const participant2 = associate.name;

			let lastMessage = "";

			apiStore
				.getLastMessage(participant1, participant2)
				.then((res) => (lastMessage = res))
				.catch((error) => (lastMessage = "No message found"));

			return <ChatsPanelItem key={`ChatsPanelItem_${index}`} name={associate.name} onlineStatus={associate.onlineStatus} lastMessage={lastMessage} />;
		});

		setChatPanelItems(itemsToRender);
	}

	return (
		<Container fluid className="chatsPanelContainer">
			<ul>{chatPanelItems}</ul>
		</Container>
	);
}
