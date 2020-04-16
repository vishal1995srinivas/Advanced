import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import wait from 'waait';
import { fakeItem } from '../lib/testUtils';
import { MockedProvider } from 'react-apollo/test-utils';
import SingleItem, { SINGLE_ITEM_QUERY } from '../components/SingleItem';
describe('<SingleItem/>', () => {
	it('renders with proper data', async () => {
		const mocks = [
			{
				//When maked request with query and variable combo
				request: { query: SINGLE_ITEM_QUERY, variables: { id: '123' } },
				//return this fake mocked state
				result: {
					data: {
						item: fakeItem()
					}
				}
			}
		];
		const wrapper = mount(
			<MockedProvider mocks={mocks}>
				<SingleItem id="123" />
			</MockedProvider>
		);
		expect(wrapper.text()).toContain('Loading...');
		await wait(0);
		wrapper.update();
		//console.log(wrapper.debug());
		expect(toJSON(wrapper.find('h2'))).toMatchSnapshot();
		expect(toJSON(wrapper.find('img'))).toMatchSnapshot();
		expect(toJSON(wrapper.find('p'))).toMatchSnapshot();
	});
	it('Errors with a not found item', async () => {
		const mocks = [
			{
				//When maked request with query and variable combo
				request: { query: SINGLE_ITEM_QUERY, variables: { id: '123' } },
				//return this fake mocked state
				result: {
					errors: [ { message: 'Items not found' } ]
				}
			}
		];
		const wrapper = mount(
			<MockedProvider mocks={mocks}>
				<SingleItem id="123" />
			</MockedProvider>
		);
		await wait();
		wrapper.update();
		//console.log(wrapper.debug());
		const item = wrapper.find('[data-test="graphql-error"]');
		//console.log(item.debug());
		expect(item.text()).toContain('Shoot!Items not found');
		expect(toJSON(item)).toMatchSnapshot();
	});
});
