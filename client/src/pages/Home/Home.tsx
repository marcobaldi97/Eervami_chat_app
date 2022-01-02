import React from "react";

import { observer } from "mobx-react";

import "./Home.styles.scss";

import { ApiStore } from "../../core/ApiStore";

import { Chat } from "../../components/Chat/Chat";
import { ChatsPanel } from "../../components/ChatsPanel/ChatsPanel";

import { Container, Spinner } from "react-bootstrap";
import { DataStore } from "../../core/DataStore";

export interface HomeProps {}

export interface FriendStatus {
	name: string;
	onlineStatus: boolean;
	lastMessage: string;
}

export const Home: React.FunctionComponent<HomeProps> = observer((props: HomeProps) => {
	const appStore = new ApiStore();
	const dataStore = DataStore.getInstance();

	const [friends, setFriends] = React.useState<FriendStatus[]>([]);
	const [loading, setLoading] = React.useState<boolean>(true);

	React.useEffect(() => {
		const getFriends = async () => {
			try {
				const response = await appStore.getFriends(dataStore.loggedUser);

				console.log(response);
				setFriends(response);
				setLoading(false);
			} catch (error) {
				console.error(error);
			}
		};

		getFriends();
	}, []);

	return (
		<Container fluid className="homeContainer">
			{!loading ? <ChatsPanel myUser={"Alphonse"} associates={friends} /> : <Spinner animation="border" variant="light" />}
			<div>{dataStore.selectedFriend && <Chat myUser={dataStore.loggedUser ?? ""} associateName={dataStore.selectedFriend} />}</div>
		</Container>
	);
});
