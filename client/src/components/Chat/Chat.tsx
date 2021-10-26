import React from "react";
import "./Chat.styles.scss";

import { Form, Row, Col, Container, Button } from "react-bootstrap";

import { ChatMessage } from "../ChatMessage/ChatMessage";

export function Chat(props: { myUser: string; associate: { name: string; onlineStatus: boolean } }) {
	const { name, onlineStatus } = props.associate;

	return (
		<div className="chatContainer">
			<div className="chatHeader">
				<h5>{name}</h5>
				<h6>{onlineStatus ? "(online)" : " (disconnected)"}</h6>
			</div>
			<div className="chatBody">
				<ChatMessage myMessage={true} content="Bla bla bla bla lalala lalalal" timeStamp="18:30" />
				<ChatMessage myMessage={false} content="Bla bla bla bla lalala lalalal" timeStamp="18:30" />
			</div>
			<div className="chatTextwrite">
				<Form.Control className="submittable" type="text" placeholder="Type your message here" />
				<Button className="submitButton" variant="primary" type="submit">
					✉
				</Button>
			</div>
		</div>
	);
}
