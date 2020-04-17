import { mount } from 'enzyme';
import wait from 'waait';
import toJSON from 'enzyme-to-json';
import RequestReset, { REQUEST_RESET } from '../components/RequestReset';
import { MockedProvider } from 'react-apollo/test-utils';

const mocks = [
	{
		request: {
			query: REQUEST_RESET,
			variables: { email: 'vishal@gmail.com' }
		},
		result: {
			data: { requestReset: { message: 'success', __typename: 'Message' } }
		}
	}
];

describe('<RequestReset/>', () => {
	it('renders and matches the snapshot', async () => {
		const wrapper = mount(
			<MockedProvider>
				<RequestReset />
			</MockedProvider>
		);
		const form = wrapper.find('form[data-test="form"]');
		expect(toJSON(form)).toMatchSnapshot();
	});
});
