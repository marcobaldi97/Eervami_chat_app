import React from "react";

import axios from "axios";

import "./ChatsPanel.styles.scss";

import { Container } from "react-bootstrap";
import { ChatsPanelItem } from "../ChatsPanelItem/ChatsPanelItem";
import { FriendStatus } from "../../pages/Home/Home";
import { ApiStore } from "../../core/ApiStore";
import { UserTitle } from "../UserTitle/UserTitle";

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

	async function printChats(myUser: string, associates: FriendStatus[]) {
		const itemsToRender = associates.map((associate, index) => {
			return <ChatsPanelItem key={`ChatsPanelItem_${index}`} name={associate.name} onlineStatus={associate.onlineStatus} lastMessage={associate.lastMessage} />;
		});

		setChatPanelItems(itemsToRender);
	}

	return (
		<Container fluid className="chatsPanelContainer">
			<div className="userTitleContainer">
				<UserTitle username={props.myUser} image="" />
			</div>
			<ul>{chatPanelItems}</ul>
		</Container>
	);
}
