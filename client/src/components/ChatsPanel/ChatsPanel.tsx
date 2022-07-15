import React from "react";

import "./ChatsPanel.styles.scss";

import { DataStore } from "../../core/DataStore";

import { Container } from "react-bootstrap";
import { ChatsPanelItem } from "../ChatsPanelItem/ChatsPanelItem";
import { FriendStatus } from "../../pages/Home/Home";
import { UserTitle } from "../UserTitle/UserTitle";

interface ChatsPanelProps {
	myUser: string;
	associates: FriendStatus[];
}

export function ChatsPanel(props: ChatsPanelProps) {
	const dataStore = DataStore.getInstance();

	const { myUser, associates } = props;
	const [chatPanelItems, setChatPanelItems] = React.useState<any[]>([]);

	React.useEffect(() => {
		try {
			printChats(myUser, associates);
		} catch (error) {
			console.error(error);
		}
	}, []);

	async function printChats(myUser: string, associates: FriendStatus[]) {
		const itemsToRender =
			associates &&
			associates.map((associate, index) => {
				return (
					<ChatsPanelItem
						key={`ChatsPanelItem_${index}`}
						name={associate.name}
						onlineStatus={associate.onlineStatus}
						lastMessage={associate.lastMessage}
						onClick={() =>
							dataStore.setSelectedFriend(associate.name)
						}
					/>
				);
			});

		setChatPanelItems(itemsToRender);
	}

	return (
		<Container fluid className="chatsPanelContainer">
			<UserTitle username={props.myUser} image="" />

			<ul>{chatPanelItems}</ul>
		</Container>
	);
}
