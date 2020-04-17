import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import Error from './ErrorMessage';
import { CURRENT_USER_QUERY } from './User';

const REQUEST_RESET = gql`
	mutation REQUEST_RESET($email: String!) {
		requestReset(email: $email) {
			message
		}
	}
`;
class RequestReset extends Component {
	state = {
		password: '',
		email: ''
	};
	saveToState = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};
	render() {
		return (
			<Mutation mutation={REQUEST_RESET} variables={this.state}>
				{(reset, { error, loading, called }) => (
					<Form
						data-test="form"
						method="post"
						onSubmit={async (e) => {
							e.preventDefault();
							await reset();
							this.setState({ email: '' });
						}}
					>
						<fieldset disabled={loading} aria-busy={loading}>
							<h2>Request a password reset</h2>
							<Error error={error} />
							{!error && !loading && called && <p>Success! Check your Email for reset link</p>}
							<label htmlFor="email">
								Email
								<input
									type="email"
									name="email"
									placeholder="email"
									value={this.state.email}
									onChange={this.saveToState}
								/>
							</label>
							<button type="submit">Request Reset</button>
						</fieldset>
					</Form>
				)}
			</Mutation>
		);
	}
}
export default RequestReset;
export { REQUEST_RESET };
