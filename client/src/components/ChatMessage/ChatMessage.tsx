import React from "react";

import "./ChatMessage.styles.scss";

export function ChatMessage(props: {
	myMessage: boolean;
	content: string;
	timeStamp: string;
}) {
	return (
		<div
			className={`chatMessageContainer ${
				props.myMessage ? "myMessageType" : "myAssociateType"
			}`}>
			<div className="contentContainer">
				<div>{props.content}</div>

				<div className="timeStamp">{props.timeStamp}</div>
			</div>
		</div>
	);
}
