import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import formatMoney from '../lib/formatMoney';
import Error from './ErrorMessage';

const CREATE_ITEM_MUTATION = gql`
	mutation CREATE_ITEM_MUTATION(
		$title: String!
		$description: String!
		$price: Int!
		$image: String
		$largeImage: String
	) {
		createItem(title: $title, description: $description, price: $price, image: $image, largeImage: $largeImage) {
			id
		}
	}
`;
class CreateItem extends Component {
	constructor(props) {
		super(props);

		this.state = {
			title: 'Shoes',
			description: 'I love this description',
			image: 'dog.png',
			largeImage: 'large_dog.png',
			price: 1000
		};
	}
	handleChange = (e) => {
		const { name, type, value } = e.target;
		const val = type === 'number' ? parseFloat(value) : value;
		this.setState({ [name]: val });
	};

	render() {
		return (
			<Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
				{(createItem, { loading, error }) => (
					<Form
						onSubmit={(e) => {
							e.preventDefault();
							console.log(this.state);
						}}
					>
						<Error error={error} />
						<fieldset disabled={loading} aria-busy={loading}>
							<label htmlFor="title">
								Title
								<input
									type="text"
									id="title"
									name="title"
									required
									placeholder="Title"
									value={this.state.title}
									onChange={this.handleChange}
								/>
							</label>
							<label htmlFor="price">
								Price
								<input
									type="number"
									id="price"
									name="price"
									required
									placeholder="Price"
									value={this.state.price}
									onChange={this.handleChange}
								/>
							</label>
							<label htmlFor="price">
								Description
								<input
									type="text"
									id="description"
									name="description"
									required
									placeholder="Enter a Description"
									value={this.state.description}
									onChange={this.handleChange}
								/>
							</label>
							<button type="submit">Submit</button>
						</fieldset>
					</Form>
				)}>
			</Mutation>
		);
	}
}
export default CreateItem;
