import React from "react";

import { Spinner as RBSpinner } from "react-bootstrap";

function Spinner(props: { loading: boolean; children: React.ReactElement }) {
	const { loading, children } = props;

	return loading ? (
		<RBSpinner animation="border" variant="light" />
	) : (
		children
	);
}

export default Spinner;
