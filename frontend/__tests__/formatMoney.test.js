import formatMoney from '../lib/formatMoney';

describe('format money function', () => {
	it('works with fractional digits ', () => {
		expect(formatMoney(1)).toEqual('$0.01');
		expect(formatMoney(10)).toEqual('$0.10');
		expect(formatMoney(9)).toEqual('$0.09');
		expect(formatMoney(40)).toEqual('$0.40');
	});

	it('leave cents off for the whole dollar', () => {
		expect(formatMoney(5000)).toEqual('$50');
		expect(formatMoney(100)).toEqual('$1');
		expect(formatMoney(50000000)).toEqual('$500,000');
	});
});
