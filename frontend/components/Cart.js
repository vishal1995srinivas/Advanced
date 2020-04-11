import React from 'react';
import gql from 'graphql-tag';
import { adopt } from 'react-adopt';
import { Query, Mutation } from 'react-apollo'; //Always place this on top.
import User from './User';
import CartStyle from './styles/CartStyles';
import Supreme from './styles/Supreme';
import SickButton from './styles/SickButton';
import CloseButton from './styles/CloseButton';
import CartItem from './CartItem';
import CalcTotalPrice from '../lib/calcTotalPrice';
import FormatMoney from '../lib/formatMoney';

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
const Composed = adopt({
	user: ({ render }) => <User>{render}</User>,
	toggleCart: ({ render }) => <Mutation mutation={TOGGLE_CART}>{render}</Mutation>,
	localState: ({ render }) => <Query query={LOCAL_STATE_QUERY}>{render}</Query>
});
const Cart = () => (
	<Composed>
		{({ user, toggleCart, localState }) => {
			const me = user.data.me;
			if (!me) return null;
			return (
				<CartStyle open={localState.data.cartOpen}>
					<header>
						<CloseButton onClick={toggleCart} title="close">
							&times;
						</CloseButton>
						<Supreme>{me.name}'s Cart</Supreme>
						<p>
							You have {me.cart.length} item{me.cart.length === 1 ? '' : 's'} in your Cart
						</p>
					</header>
					<ul>
						{me.cart.map((cartItem) => (
							<CartItem key={cartItem.id} cartItem={cartItem}>
								{cartItem.id}
							</CartItem>
						))}
					</ul>
					<footer>
						<p>{FormatMoney(CalcTotalPrice(me.cart))}</p>
						<SickButton>Checkout</SickButton>
					</footer>
				</CartStyle>
			);
		}}
	</Composed>
);

export default Cart;
export { LOCAL_STATE_QUERY, TOGGLE_CART };
