import React from "react";

import "./Home.styles.scss";

import { ApiStore } from "../../core/ApiStore";

import { Chat } from "../../components/Chat/Chat";
import { ChatsPanel } from "../../components/ChatsPanel/ChatsPanel";

import { Container } from "react-bootstrap";

interface HomeProps {
	loggedUser: string;
}

export interface FriendStatus {
	name: string;
	onlineStatus: boolean;
}

export function Home(props: HomeProps) {
	const appStore = new ApiStore();

	const [friends, setFriends] = React.useState<FriendStatus[]>([]);
	const [selectedFriend, setSelectedFriend] = React.useState<FriendStatus | undefined>(undefined);

	React.useEffect(() => {
		try {
			appStore.getFriends(props.loggedUser).then((res: FriendStatus[]) => setFriends(res));
		} catch (error) {
			console.error(error);
		}
	}, []);

	function handleClick(clickedFriend: FriendStatus) {
		setSelectedFriend(clickedFriend);
	}

	return (
		<Container fluid className="homeContainer">
			<ChatsPanel myUser={"Alphonse"} associates={friends} onClick={handleClick} />
			<div>{selectedFriend && <Chat myUser="Albert" associate={selectedFriend} />}</div>
		</Container>
	);
}
