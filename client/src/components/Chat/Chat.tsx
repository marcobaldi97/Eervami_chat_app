import React from "react";
import "./Chat.styles.scss";

import { ChatMessage } from "../ChatMessage/ChatMessage";

export function Chat(props: { myUser: string; associate: { name: string; onlineStatus: boolean } }) {
	const { name, onlineStatus } = props.associate;

	return (
		<div className="chatContainer">
			<div className="chatHeader">
				<h5>{`${name} ${onlineStatus ? "(online)" : " (disconnected)"}`}</h5>
			</div>
			<div className="chatBody">
				<ChatMessage myMessage={true} content="Bla bla bla bla lalala lalalal" timeStamp="18:30" />
				<ChatMessage myMessage={false} content="Bla bla bla bla lalala lalalal" timeStamp="18:30" />
			</div>
			<div className="chatTextwrite">this is text</div>
		</div>
	);
}
