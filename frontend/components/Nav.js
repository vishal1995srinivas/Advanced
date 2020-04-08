import Link from 'next/link';
import {Mutation} from 'react-apollo';
import User from './User';
import Signout from './SignOut';
import {TOGGLE_CART} from '../components/Cart';

import NavStyles from './styles/NavStyles';
const Nav = () => (
	<User>
		{({ data: { me } }) => (
			<NavStyles>
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
						<Signout></Signout>
						<Mutation mutation={TOGGLE_CART}>
						{(toggleCart)=>(
						<button onClick={toggleCart}>My Cart</button>
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
