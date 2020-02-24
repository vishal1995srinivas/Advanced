import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import Form from './styles/Form';
import formatMoney from '../lib/formatMoney';
import Error from './ErrorMessage';

const UPDATE_ITEM_MUTATION = gql`
	mutation UPDATE_ITEM_MUTATION(
		$title: String!
		$description: String!
		$price: Int!
		$image: String
		$largeImage: String
	) {
		UpdateItem(title: $title, description: $description, price: $price, image: $image, largeImage: $largeImage) {
			id
		}
	}
`;
//ToDo: Disable submit button (OR (Show progress bar)) until image and largeimage url arrive from cloudinary. User clicking submit immediately after uploading images might be a problem here.
class UpdateItem extends Component {
	state = {
		title: 'Cool Shoes',
		description: 'I love those shoes',
		image: 'dog.jpg',
		largeImage: 'large-dog.jpg',
		price: 1000
	};
	handleChange = (e) => {
		const { name, type, value } = e.target;
		const val = type === 'number' ? parseFloat(value) : value;
		this.setState({ [name]: val });
	};
	render() {
		return (
			<Mutation mutation={UPDATE_ITEM_MUTATION} variables={this.state}>
				{(UpdateItem, { loading, error }) => (
					<Form
						onSubmit={async (e) => {
							// Stop the form from submitting
							e.preventDefault();
							// call the mutation
							const res = await updateItem();
							// change them to the single item page
							console.log(res);
							//Similar to link tag
							Router.push({
								pathname: '/item',
								query: { id: res.data.updateItem.id }
							});
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
									placeholder="Title"
									required
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
									placeholder="Price"
									required
									value={this.state.price}
									onChange={this.handleChange}
								/>
							</label>

							<label htmlFor="description">
								Description
								<textarea
									id="description"
									name="description"
									placeholder="Enter A Description"
									required
									value={this.state.description}
									onChange={this.handleChange}
								/>
							</label>
							<button type="submit">Submit</button>
						</fieldset>
					</Form>
				)}
			</Mutation>
		);
	}
}

export default UpdateItem;
export { UPDATE_ITEM_MUTATION };