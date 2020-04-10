import React from 'react';
import { Mutation } from 'react-apollo';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from './User';

const REMOVE_FROM_CART_MUTATION = gql`
	mutation removeFromCart($id: ID!) {
		removeFromCart(id: $id) {
			id
		}
	}
`;

const BigButton = styled.button`
	font-size: 3rem;
	background: none;
	border: 0;
	&:hover {
		color: ${(props) => props.theme.red};
		cursor: pointer;
	}
`;

class RemoveFromCart extends React.Component {
	static propTypes = {
		id: PropTypes.string.isRequired
	};
	update = (cache, payload) => {
		//1. First read that from the cache.
		const data = cache.readQuery({ query: CURRENT_USER_QUERY });
		console.log(data, payload);
		//2. remove item from cache
		const RemovedCartItemId = payload.data.removeFromCart.id;
		data.me.cart = data.me.cart.filter((cartItem) => cartItem.id !== RemovedCartItemId);
		//3. Rewrite to cache
		cache.writeQuery({ query: CURRENT_USER_QUERY, data: data });
	};
	render() {
		return (
			<Mutation mutation={REMOVE_FROM_CART_MUTATION} variables={{ id: this.props.id }} update={this.update}>
				{(removeFromCart, { loading, error }) => (
					<BigButton
						disabled={loading}
						onClick={() => {
							removeFromCart().catch((err) => alert(err.message));
						}}
						title="Delete Item"
					>
						&times;
					</BigButton>
				)}
			</Mutation>
		);
	}
}

export default RemoveFromCart;
