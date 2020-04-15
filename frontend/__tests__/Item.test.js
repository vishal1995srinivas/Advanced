import ItemComponent from '../components/Item';
import { shallow } from 'enzyme';

const fakeItem = {
	id: 'ABC123',
	title: 'A Cool item',
	price: 5000,
	description: 'This item is very cool!',
	image: 'dog.jpg',
	largeImage: 'largedog.jpg'
};

describe('<Item/>', () => {
	it('renders out the img ', () => {
		const wrapper = shallow(<ItemComponent item={fakeItem} />);
		const img = wrapper.find('img');
		expect(img.props().src).toBe(fakeItem.image);
		expect(img.props().alt).toBe(fakeItem.title);
	});
	it('renders and displays properly', () => {
		const wrapper = shallow(<ItemComponent item={fakeItem} />);
		const PriceTag = wrapper.find('PriceTag');
		console.log(PriceTag.children());
		expect(PriceTag.children().text()).toBe('$50');
		expect(wrapper.find('Title a').text()).toBe(fakeItem.title);
	});
	it('renders out the buttons properly', () => {
		const wrapper = shallow(<ItemComponent item={fakeItem} />);

		//console.log(wrapper.debug());
		const buttonList = wrapper.find('.buttonList');
		expect(buttonList.children()).toHaveLength(3);
		expect(buttonList.find('Link')).toHaveLength(1);
		expect(buttonList.find('Link')).toBeTruthy(); //These both yield same results.
	});
});
