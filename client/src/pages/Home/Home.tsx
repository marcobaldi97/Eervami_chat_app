import React, { useCallback } from "react";

import { observer } from "mobx-react";

import "./Home.styles.scss";

import { ApiStore } from "../../core/ApiStore";

import { Chat } from "../../components/Chat/Chat";
import { ChatsPanel } from "../../components/ChatsPanel/ChatsPanel";
import Spinner from "../../components/Spinner/Spinner";

import { Container } from "react-bootstrap";
import { DataStore } from "../../core/DataStore";

export interface HomeProps {}

export interface FriendStatus {
	name: string;
	onlineStatus: boolean;
	lastMessage: string;
}

export const Home: React.FunctionComponent<HomeProps> = observer(
	(props: HomeProps) => {
		const appStore = new ApiStore();
		const dataStore = DataStore.getInstance();

		const [friends, setFriends] = React.useState<any[]>([]);
		const [loading, setLoading] = React.useState<boolean>(true);

		const getFriends = useCallback(async () => {
			setFriends(
				Array.from(await appStore.getFriends(dataStore.loggedUser)) ??
					[]
			);
			setLoading(false);
		}, [setFriends, setLoading]);

		React.useEffect(() => {
			getFriends();
		}, [getFriends]);

		return (
			<Container fluid className="homeContainer">
				<Spinner loading={loading}>
					<ChatsPanel myUser={"Alphonse"} friends={friends} />
				</Spinner>
				<div>
					{dataStore.selectedFriend && (
						<Chat
							myUser={dataStore.loggedUser ?? ""}
							associateName={dataStore.selectedFriend}
						/>
					)}
				</div>
			</Container>
		);
	}
);
