function Person(name, foods) {
	this.name = name;
	this.foods = foods;
}

Person.prototype.fetchFavFoods = function() {
	return new Promise((resolve, reject) => {
		//Simulating an api
		setTimeout(() => resolve(this.foods), 2000);
	});
};

describe('mocking learning', () => {
	it('mocks a reg function', () => {
		const fetchDogs = jest.fn();
		fetchDogs('snickers');
		expect(fetchDogs).toHaveBeenCalled();
		expect(fetchDogs).toHaveBeenCalledWith('snickers');
		fetchDogs('hugo');
		expect(fetchDogs).toHaveBeenCalledTimes(2);
	});

	it('can create a person', async () => {
		const me = new Person('Vis', [ 'pizza', 'burgers' ]);
		const favFoods = await me.fetchFavFoods();
		expect(favFoods).toContain('pizza');
	});
});
