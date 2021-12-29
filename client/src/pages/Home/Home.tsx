import React from "react";

import "./Home.styles.scss";

import { ApiStore } from "../../core/ApiStore";

import { Chat } from "../../components/Chat/Chat";
import { ChatsPanel } from "../../components/ChatsPanel/ChatsPanel";

import { Container, Spinner } from "react-bootstrap";

interface HomeProps {
	loggedUser: string;
}

export interface FriendStatus {
	name: string;
	onlineStatus: boolean;
	lastMessage: string;
}

export function Home(props: HomeProps) {
	const appStore = new ApiStore();

	const [friends, setFriends] = React.useState<FriendStatus[]>([]);
	const [selectedFriend, setSelectedFriend] = React.useState<FriendStatus | undefined>(undefined);
	const [loading, setLoading] = React.useState<boolean>(true);

	React.useEffect(() => {
		const getFriends = async () => {
			try {
				const response = await appStore.getFriends(props.loggedUser);

				console.log(response);
				setFriends(response);
				setLoading(false);
			} catch (error) {
				console.error(error);
			}
		};

		getFriends();
	}, []);

	function handleClick(clickedFriend: FriendStatus) {
		setSelectedFriend(clickedFriend);
	}

	return (
		<Container fluid className="homeContainer">
			{!loading ? <ChatsPanel myUser={"Alphonse"} associates={friends} onClick={handleClick} /> : <Spinner animation="border" variant="light" />}
			<div>{selectedFriend && <Chat myUser="Albert" associate={selectedFriend} />}</div>
		</Container>
	);
}
