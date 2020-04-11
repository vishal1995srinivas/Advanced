import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import Router from 'next/router';
import NProgress from 'nprogress';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import calcTotalPrice from '../lib/calcTotalPrice';
import Error from './ErrorMessage';
import User, { CURRENT_USER_QUERY } from './User';
import { Mutation } from 'react-apollo';

const CURRENT_ORDER_MUTATION = gql`
	mutation createOrder($token: String!) {
		createOrder(token: $token) {
			id
			charge
			items {
				id
				title
			}
		}
	}
`;

function TotalItems(cart) {
	return cart.reduce((tally, cartItem) => tally + cartItem.quantity, 0);
}

class TakeMyMoney extends Component {
	onToken = (res, createOrder) => {
		console.log(res.id);
		//Manually call the mutation once we have the stripe token.
		createOrder({
			variables: {
				token: res.id
			}
		}).catch((err) => {
			alert(err.message);
		});
	};
	render() {
		return (
			<User>
				{({ data: { me } }) => (
					<Mutation mutation={CURRENT_ORDER_MUTATION} refetchQueries={[ { query: CURRENT_USER_QUERY } ]}>
						{(createOrder) => (
							<StripeCheckout //Provide as much info possible so that chances of declining is low.
								currency="USD"
								stripeKey="pk_test_556JXNBdRYtNmeVoBl4VsXCH00jHsLusuc"
								amount={calcTotalPrice(me.cart)}
								name="Sick-fits Online Store"
								image={me.cart[0].item && me.cart[0].item.image}
								description={`Order of ${TotalItems(me.cart)}`}
								token={(res) => this.onToken(res, createOrder)}
							>
								{this.props.children}
							</StripeCheckout>
						)}
					</Mutation>
				)}
			</User>
		);
	}
}

export default TakeMyMoney;
