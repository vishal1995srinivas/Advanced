import React, { Component } from 'react';
import { Query } from 'react-apollo';
import Error from './ErrorMessage';
import gql from 'graphql-tag';
import Table from './styles/Table';
import SickButton from './styles/SickButton';
import PropTypes from 'prop-types';
const Permission = [ 'ADMIN', 'USER', 'ITEMCREATE', 'ITEMUPDATE', 'ITEMDELETE', 'PERMISSIONUPDATE' ];

const ALL_USERS_QUERY = gql`
	query {
		users {
			id
			name
			email
			permissions
		}
	}
`;
const Permissions = (props) => (
	<Query query={ALL_USERS_QUERY}>
		{({ data, loading, error }) =>
			console.log(data) || (
				<div>
					<Error error={error} />
					<p>Hey</p>
					<h2>Manage Permissions</h2>
					<Table>
						<thead>
							<tr>
								<th>Name</th>
								<th>Email</th>
								{Permission.map((permission) => <th key={permission}>{permission}</th>)}
								<th>Action</th>
							</tr>
						</thead>
						<tbody>{data.users.map((user) => <User user={user} key={user.id} />)}</tbody>
					</Table>
				</div>
			)}
	</Query>
);

class User extends Component {
	static propTypes = {
		user: PropTypes.shape({
			name: PropTypes.string,
			id: PropTypes.string,
			email: PropTypes.string,
			permissions: PropTypes.array
		}).isRequired
	};
	constructor(props) {
		super(props);
		this.state = {
			permission: this.props.user.permissions
		};
	}
	handleOnChangePermission = (e) => {
		console.log(e.target);
	};
	render() {
		const user = this.props.user;
		return (
			<tr>
				<td>{user.name}</td>
				<td>{user.email}</td>
				{Permission.map((permission) => (
					<td key={permission}>
						<label htmlFor={`${user.id}-permission-${permission}`}>
							<input
								type="checkbox"
								checked={this.state.permission.includes(permission)}
								value={permission}
								onChange={this.handleOnChangePermission}
							/>
						</label>
					</td>
				))}
				<td>
					<SickButton>Update</SickButton>
				</td>
			</tr>
		);
	}
}

export default Permissions;
