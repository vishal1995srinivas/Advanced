import withApollo from 'next-with-apollo';
import ApolloClient from 'apollo-boost';
import { endpoint } from '../config';
import { LOCAL_STATE_QUERY, TOGGLE_CART } from '../components/Cart';

function createClient({ headers }) {
	return new ApolloClient({
		uri: process.env.NODE_ENV === 'development' ? endpoint : endpoint,
		request: (operation) => {
			operation.setContext({
				fetchOptions: {
					credentials: 'include'
				},
				headers
			});
		},
		//local data
		clientState: {
			resolvers: {
				Mutation: {
					//_ is in docs.dont worry abt that, variables for mutation variables, client has been destructured into {cache}
					toggleCart(_, variables, { cache }) {
						const { cartOpen } = cache.readQuery({
							query: LOCAL_STATE_QUERY
						});
						const data = {
							data: { cartOpen: !cartOpen }
						};
						cache.writeData(data);
						return data;
					}
				}
			},
			defaults: {
				cartOpen: false
			}
		}
	});
}

export default withApollo(createClient);
