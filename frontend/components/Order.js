import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { format } from 'date-fns';
import Head from 'next/head';
import gql from 'graphql-tag';
import formatMoney from '../lib/formatMoney';
import Error from './ErrorMessage';
import OrderStyles from './styles/OrderStyles';

const SINGLE_ORDER_QUERY = gql`
	query SINGLE_ORDER_QUERY($id: ID!) {
		order(id: $id) {
			id
			charge
			total
			createdAt
			user {
				id
			}
			items {
				id
				title
				description
			}
		}
	}
`;

class Order extends Component {
	static propTypes = {
		id: PropTypes.string.isRequired
	};
	render() {
		return (
			<Query query={SINGLE_ORDER_QUERY} variables={{ id: this.props.id }}>
				{({ data, error, loading }) => {
					if (loading) return <p>Loading...</p>;
					if (error) return <Error error={error} />;
					return (
						<OrderStyles>
							<Head>
								<title> Sick-Fits -Order {Order.id}</title>
							</Head>
							<p>
								<span>Order Id: </span>
								<span>{this.props.id}</span>
							</p>
							<p>
								<span>Charge</span>
								<span>{Order.charge}</span>
							</p>
							<p>
								<span>Date</span>
								<span>{format(order.createdAt, 'MMMM d, YYYY h:mm a')}</span>
							</p>
						</OrderStyles>
					);
				}}
			</Query>
		);
	}
}

export default Order;
