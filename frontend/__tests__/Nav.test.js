import { mount } from 'enzyme';
import wait from 'waait';
import Nav from '../components/Nav';
import { CURRENT_USER_QUERY } from '../components/User';
import { MockedProvider } from 'react-apollo/test-utils';
import { fakeUser } from '../lib/testUtils';
import toJSON from 'enzyme-to-json';

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
describe('<Nav/>', () => {
	it('renders a minimal nav when signed out', async () => {
		const wrapper = mount(
			<MockedProvider mocks={notSignedInMocks}>
				<Nav />
			</MockedProvider>
		);
		await wait();
		wrapper.update();
		//console.log(wrapper.debug());
		const nav = wrapper.find("ul[data-test='nav']");
		console.log(nav.debug());
		expect(toJSON(nav)).toMatchSnapshot();
	});
	it('renders a full nav when signed in', async () => {
		const wrapper = mount(
			<MockedProvider mocks={signedInMocks}>
				<Nav />
			</MockedProvider>
		);
		await wait();
		wrapper.update();
		//console.log(wrapper.debug());
		const nav = wrapper.find("ul[data-test='nav']");
		const count = nav.find('div.count');
		expect(toJSON(count)).toMatchSnapshot();
		//console.log(count.debug());
	});
});
