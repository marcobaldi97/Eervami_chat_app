import React from "react";
import { Container, Figure } from "react-bootstrap";

import "./UserTitle.styles.scss";

interface UserTitleProps {
	username: string;
	image: string;
}

export function UserTitle(props: UserTitleProps) {
	const { username, image } = props;

	return (
		<Container fluid className="userTitleContainer">
			<div className="userImageContainer">
				<Figure>
					<Figure.Image width={90} height={90} alt="User Image" src={image} />
				</Figure>
			</div>
			<div className="usernameContainer">
				<h3>{username}</h3>
			</div>
		</Container>
	);
}
