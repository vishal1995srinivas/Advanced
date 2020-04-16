import ItemComponent from '../components/Item';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
//SNAPSHOT TESTING:
// the tests going to git repo..
// whenever you commit a new change..
//automatically pull request is created ,
// this helps the reviewer to go through
// changes and commit the necessary.
const fakeItem = {
	id: 'ABC123',
	title: 'A Cool item',
	price: 5000,
	description: 'This item is very cool!',
	image: 'dog.jpg',
	largeImage: 'largedog.jpg'
};
//Unit Testing
// describe('<Item/>', () => {
// 	it('renders out the img ', () => {
// 		const wrapper = shallow(<ItemComponent item={fakeItem} />);
// 		const img = wrapper.find('img');
// 		expect(img.props().src).toBe(fakeItem.image);
// 		expect(img.props().alt).toBe(fakeItem.title);
// 	});
// 	it('renders and displays properly', () => {
// 		const wrapper = shallow(<ItemComponent item={fakeItem} />);
// 		const PriceTag = wrapper.find('PriceTag');
// 		console.log(PriceTag.children());
// 		expect(PriceTag.children().text()).toBe('$50');
// 		expect(wrapper.find('Title a').text()).toBe(fakeItem.title);
// 	});
// 	it('renders out the buttons properly', () => {
// 		const wrapper = shallow(<ItemComponent item={fakeItem} />);

// 		//console.log(wrapper.debug());
// 		const buttonList = wrapper.find('.buttonList');
// 		expect(buttonList.children()).toHaveLength(3);
// 		expect(buttonList.find('Link')).toHaveLength(1);
// 		expect(buttonList.find('Link')).toBeTruthy(); //These both yield same results.
// 		expect(buttonList.find('AddToCart')).toBeTruthy();
// 		expect(buttonList.find('DeleteItem')).toBeTruthy();
// 	});
// });
// Snapshot Testing
describe('<Item/>', () => {
	it('renders and matched the component', () => {
		const wrapper = shallow(<ItemComponent item={fakeItem} />);
		expect(toJSON(wrapper)).toMatchSnapshot();
	});
});
