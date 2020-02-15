import App, { Container } from 'next/app';
import Page from '../components/Page';
import { ApolloProvider } from 'react-apollo';
import withData from '../lib/withData';
class MyApp extends App {
	static async getInitialProps({ Component, ctx }) {
		let PageProps = {};
		if (Component.getInitialProps) {
			PageProps = await Component.getInitialProps(ctx);
		}
		PageProps.query = ctx.query;
		return { PageProps };
	}
	render() {
		const { Component, apollo, PageProps } = this.props;
		return (
			<Container>
				<ApolloProvider client={apollo}>
					{/* <p>Hey I'm on every page</p> */}
					<Page>
						<Component {...PageProps} />
					</Page>
				</ApolloProvider>
			</Container>
		);
	}
}
export default withData(MyApp);
