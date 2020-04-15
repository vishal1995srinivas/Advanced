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
	it('renders and displays properly', () => {
		const wrapper = shallow(<ItemComponent item={fakeItem} />);
		const PriceTag = wrapper.find('PriceTag');
		console.log(PriceTag.children());
		console.log(PriceTag.debug());
	});
});
