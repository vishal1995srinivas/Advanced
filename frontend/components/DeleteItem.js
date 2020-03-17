import React, { Component } from 'react';

class DeleteItem extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		return <div>{this.props.children}</div>;
	}
}

export default DeleteItem;
