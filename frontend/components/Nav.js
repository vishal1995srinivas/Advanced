import Link from 'next/link';
import User from './User';

import NavStyles from './styles/NavStyles';
const Nav = () => (
	<NavStyles>
		<User>
			{(data) => {
				console.log(data);
				return <p>User</p>;
			}}
		</User>
		<Link href="/Items">
			<a>Shop</a>
		</Link>
		<Link href="/sell">
			<a>Sell</a>
		</Link>
		<Link href="/signup">
			<a>Signup</a>
		</Link>
		<Link href="/orders">
			<a>Orders</a>
		</Link>
		<Link href="/me">
			<a>Account</a>
		</Link>
	</NavStyles>
);
export default Nav;
