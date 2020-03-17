import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { All_ITEMS_QUERY, ALL_ITEMS_QUERY } from './Items';

const DELETE_ITEM_MUTATION = gql`
	mutation DELETE_ITEM_MUTATION($id: ID!) {
		deleteItem(id: $id) {
			id
		}
	}
`;

class DeleteItem extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}
	update = (cache, payload) => {
		//manually update the cache on the client, so it matches the server
		const data = cache.readQuery({ query: All_ITEMS_QUERY });
		console.log(data, payload);
		//1. Read the cache for the items we want
		//2. Filter the deleted item out of the page
		data.items = data.items.filter((item) => item.id !== payload.data.deleteItem.id);
		//Put the items back
		cache.writeQuery({ query: ALL_ITEMS_QUERY, data: data });
	};

	render() {
		return (
			<Mutation mutation={DELETE_ITEM_MUTATION} variables={{ id: this.props.id }}>
				{(deleteItem, { err }) => (
					<button
						onClick={() => {
							if (confirm('Are you sure you want to delete this item?')) {
								deleteItem();
							}
						}}
					>
						{this.props.children}
					</button>
				)}
			</Mutation>
		);
	}
}

export default DeleteItem;
