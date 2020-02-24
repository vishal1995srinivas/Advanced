const Mutations = {
	async createItem(parent, args, ctx, info) {
		//TODO : Check if user is logged in
		const item = await ctx.db.mutation.createItem(
			{
				data: {
					...args
				}
			},
			info
		);

		return item;
	},
	updateItem(parent, args, ctx, info) {
		//first take a copy of updates
		const updates = { ...args };
		//remove ID from the updates
		delete updates.id;
		//run the update method
		return ctx.db.mutation.updateItem(
			{
				data: updates,
				where: {
					id: args.id
				}
			},
			info
		);
	}
};

module.exports = Mutations;
