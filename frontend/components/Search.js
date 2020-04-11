import React, { Component } from 'react';
import DownShift from 'downshift';
import Router from 'next/router';
import { ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import debounce from 'lodash.debounce';
import { DropDown, DropDownItem, SearchStyles } from './styles/DropDown';

const SEARCH_ITEMS_QUERY = gql`
	query SEARCH_ITEMS_QUERY($searchTerm: String!) {
		item(where: { OR: [{ title_contains: $searchTerm }, { descriptions_contains: $searchTerm }] })
	}
`;

class AutoComplete extends Component {
	render() {
		return (
			<SearchStyles>
				<div>
					<ApolloConsumer>
						{(client) => <input type="search" onChange={() => console.log(client)} />}
					</ApolloConsumer>
					<DropDown>
						<p>Items will go here</p>
					</DropDown>
				</div>
			</SearchStyles>
		);
	}
}

export default AutoComplete;
