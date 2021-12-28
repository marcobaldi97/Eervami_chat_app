import React from "react";

import axios from "axios";

import "./ChatsPanel.styles.scss";

import { Container } from "react-bootstrap";
import { ChatsPanelItem } from "../ChatsPanelItem/ChatsPanelItem";

export function ChatsPanel(props: { myUser: string; associates: { name: string; onlineStatus: boolean }[] }) {
	function printChats(myUser: string, associates: { name: string; onlineStatus: boolean }[]) {
		return associates.map((associate, index) => {
			const participant1 = myUser;
			const participant2 = associate.name;

			//axios get request to localhost:9000/messages/getLastChat with participan1 and 2 as parameters
			//returns the last message between the two participants
			axios
				.get(`http://localhost:9000/messages/getLastMsg?participant1=${participant1}&participant2=${participant2}`)
				.then((res) => {
					console.log(res.data);
				})
				.catch((err) => {
					console.log(err);
				});

			const lastMessage = "Ipso dum pla pla boom boom wtf is this ipsum dupsum polung pilung";

			return <ChatsPanelItem key={`ChatsPanelItem_${index}`} name={associate.name} onlineStatus={associate.onlineStatus} lastMessage={lastMessage} />;
		});
	}

	return (
		<Container fluid className="chatsPanelContainer">
			<ul>{printChats(props.myUser, props.associates)}</ul>
		</Container>
	);
}
