import React, { Component } from 'react';
import DownShift, { resetIdCounter } from 'downshift';
import Router from 'next/router';
import { ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import debounce from 'lodash.debounce';
import { DropDown, DropDownItem, SearchStyles } from './styles/DropDown';

const SEARCH_ITEMS_QUERY = gql`
	query SEARCH_ITEMS_QUERY($searchTerm: String!) {
		items(where: { OR: [{ title_contains: $searchTerm }, { description_contains: $searchTerm }] }) {
			id
			image
			title
		}
	}
`;
function routeToItem(item) {
	Router.push({
		pathname: '/item',
		query: {
			id: item.id
		}
	});
}

class AutoComplete extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: false,
			items: []
		};
	}
	onChange = debounce(async (e, client) => {
		this.setState({
			loading: true
		});
		console.log('Searching...');
		//Manually query apollo client
		const res = await client.query({
			query: SEARCH_ITEMS_QUERY,
			variables: { searchTerm: e.target.value }
		});
		//console.log('Res is', res);
		this.setState({
			items: res.data.items,
			loading: false
		});
	}, 350);
	render() {
		resetIdCounter();
		return (
			<SearchStyles>
				<DownShift onChange={routeToItem} itemToString={(item) => (item === null ? '' : item.title)}>
					{({ getInputProps, getItemProps, isOpen, inputValue, highlightedIndex }) => (
						<div>
							<ApolloConsumer>
								{(client) => (
									<input
										{...getInputProps({
											type: 'search',
											placeholder: 'Search for Items',
											onChange: (e) => {
												e.persist();
												this.onChange(e, client);
											}
										})}
									/>
								)}
							</ApolloConsumer>
							{isOpen && (
								<DropDown>
									{this.state.items.map((item, index) => (
										<DropDownItem
											{...getItemProps({ item })}
											key={item.id}
											highlighted={index === highlightedIndex}
										>
											<img width="50" height="50" src={item.image} alt={item.image} />
											{item.title}
										</DropDownItem>
									))}
									{!this.state.items.length &&
									!this.state.loading && (
										<DropDownItem>No results found for {inputValue}</DropDownItem>
									)}
								</DropDown>
							)}
						</div>
					)}
				</DownShift>
			</SearchStyles>
		);
	}
}
export default AutoComplete;
