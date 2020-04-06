const { forwardTo } = require('prisma-binding');
const { hasPermission } = require('../utils');
const Query = {
	items: forwardTo('db'),
	item: forwardTo('db'),
	itemsConnection: forwardTo('db'),
	me(parent, args, ctx, info) {
		//check if there is a current userID
		if (!ctx.request.userId) {
			return null;
		}
		return ctx.db.query.user(
			{
				where: { id: ctx.request.userId }
			},
			info
		);
	},
	async users(parent, args, ctx, info) {
		//1. Check if the user has signed in
		if (!ctx.request.userId) {
			throw new Error('You must be signed in');
		}
		//2. Check if the user has permissions to query all the users.
		hasPermission(ctx.request.user, [ 'ADMIN', 'PERMISSIONUPDATE' ]);
		// 3. If they do, query all the users!
		return ctx.db.query.users({}, info);
	}
};

module.exports = Query;
