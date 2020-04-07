import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import Error from './ErrorMessage';
import gql from 'graphql-tag';
import Table from './styles/Table';
import SickButton from './styles/SickButton';
import PropTypes from 'prop-types';
const Permission = [ 'ADMIN', 'USER', 'ITEMCREATE', 'ITEMUPDATE', 'ITEMDELETE', 'PERMISSIONUPDATE' ];

const UPDATE_PERMISSIONS_MUTATION = gql`
	mutation updatedPermissions($permissions: [Permission], $userId: ID!) {
		updatedPermission(permissions: $permissions, userId: $userId) {
			id
			name
			permissions
			email
		}
	}
`;
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
		//1. take a copy of the target

		const checkbox = e.target;

		//2. add Array of updated permission from state
		let updatedPermission = [ ...this.state.permission ];
		//3. figure it out to add or remove the permission by checked
		if (checkbox.checked) {
			//add
			updatedPermission.push(checkbox.value);
		} else {
			updatedPermission = updatedPermission.filter((permission) => permission !== checkbox.value);
		}
		//4. setstate
		this.setState({ permission: updatedPermission });
		console.log(updatedPermission);
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
								id={`${user.id}-permission-${permission}`}
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
