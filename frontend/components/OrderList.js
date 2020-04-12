import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { formatDistance } from 'date-fns';
import Link from 'next/link';
import styled from 'styled-components';
import gql from 'graphql-tag';
import formatMoney from '../lib/formatMoney';
import OrderItemStyles from './styles/OrderItemStyles';

const USER_ORDERS_QUERY = gql`
	query USER_ORDERS_QUERY {
		orders(orderBy: createdAt_DESC) {
			id
			total
			createdAt
			items {
				id
				title
				price
				description
				quantity
				image
			}
		}
	}
`;
const OrderUl = styled.ul`
	display: grid;
	grid-gap: 4rem;
	grid-template-columns: repeat(auto-fit, minmax(40%, 1fr));
`;
class OrderList extends Component {
	render() {
		return (
			<Query query={USER_ORDERS_QUERY}>
				{({ data: { orders }, loading, error }) => {
					if (loading) return <p>Loading...</p>;
					if (error) return <Error error={error} />;
					console.log(orders);
					return (
						<div>
							<h2>You have {orders.length} orders</h2>
							<OrderUl>
								{orders.map((order) => (
									<OrderItemStyles key={order.id}>
										<Link
											href={{
												pathname: '/order',
												query: { id: order.id }
											}}
										>
											<p>dsdsd</p>
										</Link>
									</OrderItemStyles>
								))}
							</OrderUl>
							{/* <OrderUl>
								{orders.map((order) => (
									<OrderItemStyles>
										<Link
											href={{
												pathname: '/order',
												query: { id: order.id }
											}}
										/>
									</OrderItemStyles>
								))}
							</OrderUl> */}
						</div>
					);
				}}
			</Query>
		);
	}
}

export default OrderList;
