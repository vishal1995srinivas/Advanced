import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import wait from 'waait';
import { fakeUser } from '../lib/testUtils';
import { MockedProvider } from 'react-apollo/test-utils';
import { CURRENT_USER_QUERY } from '../components/SingleItem';
import PleaseSignIn from '../components/PleaseSignIn';

const notSignedInMocks = [
	{
		request: { query: CURRENT_USER_QUERY },
		result: { data: { me: null } }
	}
];

const signedInMocks = [
	{
		request: { query: CURRENT_USER_QUERY },
		result: { data: { me: fakeUser() } }
	}
];

describe('<PleaseSignIn/>', () => {
	it('renders the sign in dialog to logged out users', async () => {
		const wrapper = mount(
			<MockedProvider mocks={notSignedInMocks}>
				<PleaseSignIn />
			</MockedProvider>
		);
		await wait();
		wrapper.update();
		expect(wrapper.text()).toContain('Please sign in before continuing');
		const SignIn = wrapper.find('Signin');
		expect(SignIn.exists()).toBe(true);
	});
	it('renders out the child component when user is logged in', async () => {
		const Hey = () => <p>Hey!</p>;
		const wrapper = mount(
			<MockedProvider mocks={signedInMocks}>
				<PleaseSignIn>
					<Hey />
				</PleaseSignIn>
			</MockedProvider>
		);

		await wait();
		wrapper.update();
		console.log(wrapper.debug());
	});
});
