import Link from 'next/link';
import { Mutation } from 'react-apollo';
import User from './User';
import Signout from './SignOut';
import { TOGGLE_CART } from '../components/Cart';

import NavStyles from './styles/NavStyles';
import CartCount from './CartCount';
const Nav = () => (
	<User>
		{({ data: { me } }) => (
			<NavStyles data-test="nav">
				<Link href="/Items">
					<a>Shop</a>
				</Link>
				{me && (
					<>
						<Link href="/sell">
							<a>Sell</a>
						</Link>
						<Link href="/orders">
							<a>Orders</a>
						</Link>
						<Link href="/me">
							<a>Account</a>
						</Link>
						<Signout />
						<Mutation mutation={TOGGLE_CART}>
							{(toggleCart) => (
								<button onClick={toggleCart}>
									My Cart<CartCount
										count={me.cart.reduce((total, cartItem) => total + cartItem.quantity, 0)}
									/>
								</button>
							)}
						</Mutation>
					</>
				)}
				{!me && (
					<Link href="/signup">
						<a>SignIn</a>
					</Link>
				)}
			</NavStyles>
		)}
	</User>
);
export default Nav;
