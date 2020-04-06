import { Query } from 'react-apollo';
import Error from './ErrorMessage';
import gql from 'graphql-tag';
import Table from './styles/Table';
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
							<tbody>
								<tr>ghh</tr>
							</tbody>
						</thead>
					</Table>
				</div>
			)}
	</Query>
);

export default Permissions;
