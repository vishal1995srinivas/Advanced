import React from 'react';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo'; //Always place this on top.
import CartStyle from './styles/CartStyles';
import Supreme from './styles/Supreme';
import SickButton from './styles/SickButton';
import CloseButton from './styles/CloseButton';

const LOCAL_STATE_QUERY = gql`
	query {
		cartOpen @client
	}
`;
const TOGGLE_CART = gql`
	mutation {
		toggleCart @client
	}
`;

const Cart = () => (
	<Mutation mutation={TOGGLE_CART}>
		{(toggleCart) => (
			<Query query={LOCAL_STATE_QUERY}>
				{({ data }) => (
					<CartStyle open={data.cartOpen}>
						<header>
							<CloseButton onClick={toggleCart} title="close">
								&times;
							</CloseButton>
							<Supreme>Your Cart</Supreme>
							<p>You have items in your Cart</p>
						</header>
						<footer>
							<p>$10</p>
							<SickButton>Checkout</SickButton>
						</footer>
					</CartStyle>
				)}
			</Query>
		)}
	</Mutation>
);

export default Cart;
export { LOCAL_STATE_QUERY, TOGGLE_CART };
