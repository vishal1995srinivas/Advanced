import React from 'react';
import CartStyle from './styles/CartStyles';
import Supreme from './styles/Supreme';
import SickButton from './styles/SickButton';
import CloseButton from './styles/CloseButton';

const Cart = () => (
	<CartStyle open={true}>
		<header>
			<CloseButton title="close">&times;</CloseButton>
			<Supreme>Your Cart</Supreme>
			<p>You have items in your Cart</p>
		</header>
		<footer>
			<p>$10</p>
			<SickButton>Checkout</SickButton>
		</footer>
	</CartStyle>
);

export default Cart;
