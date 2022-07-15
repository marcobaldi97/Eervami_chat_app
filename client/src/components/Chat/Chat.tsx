import React from "react";
import "./Chat.styles.scss";

import { ApiStore, Message } from "../../core/ApiStore";

import { Form, Button } from "react-bootstrap";

import { ChatMessage } from "../ChatMessage/ChatMessage";
import { UserTitle } from "../UserTitle/UserTitle";

export function Chat(props: { myUser: string; associateName: string }) {
	const apiStore = new ApiStore();

	const { myUser, associateName } = props;

	const [message, setMessage] = React.useState("");
	const [messages, setMessages] = React.useState<any>([]);

	let bottomChat: any = undefined;

	async function asyncFetch() {
		const rawMessages: Message[] = await apiStore.getMessages(
			myUser,
			associateName
		);

		const processedMessages = rawMessages.map((message: any) => {
			const { user1, msg, msg_id, date_time } = message;

			return (
				<ChatMessage
					key={msg_id}
					myMessage={user1 === myUser}
					content={msg}
					timeStamp={date_time ?? new Date().toDateString}
				/>
			);
		});

		setMessages(processedMessages);
	}

	React.useEffect(() => {
		bottomChat && bottomChat.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	React.useEffect(() => {
		asyncFetch();
	}, [myUser, associateName]);

	function handleOnChange(event: any) {
		event.preventDefault();

		setMessage(event.target.value);
	}

	async function handleSend(event: any) {
		event.preventDefault();

		await apiStore.sendMessage(myUser, associateName, message);

		await asyncFetch();

		setMessage("");
	}

	return (
		<div className="chatContainer">
			<UserTitle username={associateName} image="" />

			<div className="chatBody">
				{messages}
				<div ref={(bottom) => (bottomChat = bottom)}></div>
			</div>
			<div className="chatTextwrite">
				<Form.Control
					className="submittableText"
					type="text"
					value={message}
					placeholder="Type your message here"
					onChange={handleOnChange}
					onKeyUp={(event) => {
						event.key === "Enter" && handleSend(event);
					}}
				/>
				<Button
					className="submitButton"
					variant="primary"
					type="submit"
					onClick={handleSend}>
					<>✉</>
				</Button>
			</div>
		</div>
	);
}
