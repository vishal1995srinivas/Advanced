import { randomBytes } from 'crypto';
import { promisify } from 'util';
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Mutations = {
	async createItem(parent, args, ctx, info) {
		// TODO: Check if they are logged in

		const item = await ctx.db.mutation.createItem(
			{
				data: {
					...args
				}
			},
			info
		);
		console.log(item);
		return item;
	},
	updateItem(parent, args, ctx, info) {
		// first take a copy of the updates
		const updates = { ...args };
		// remove the ID from the updates
		delete updates.id;
		// run the update method
		return ctx.db.mutation.updateItem(
			{
				data: updates,
				where: {
					id: args.id
				}
			},
			info
		);
	},
	async deleteItem(parent, args, ctx, info) {
		const where = { id: args.id };
		//1. Find the item
		const item = await ctx.db.query.item({ where }, `{id title}`);

		//2. Check if they own that item, or have the permissions
		//TODO
		//3. Delete It
		return ctx.db.mutation.deleteItem({ where }, info);
	},
	async signup(parent, args, ctx, info) {
		//lowercase their email
		args.email = args.email.toLowerCase();
		//hash their password
		const password = await bcrypt.hash(args.password, 10); //Salt =10 which generates unique hashes for different databases.
		//create a user in the database
		const user = await ctx.db.mutation.createUser(
			{
				data: {
					...args,
					password: password,
					permissions: { set: [ 'USER' ] }
				}
			},
			info
		);
		//TODO :create a jwt for user
		const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
		//TODO : Set a cookie for a response
		ctx.response.cookie('token', token, {
			httpOnly: true,
			maxAge: 1000 * 60 * 60 * 24 * 365 //1 year
		});

		//TODO: Return user to the browser
		return user;
	},
	async signin(parent, { email, password }, ctx, info) {
		//destructured args.email and args.password=> {email,password}
		//TODO
		// 1. check if there is a user with that email
		const user = await ctx.db.query.user({ where: { email: email } });
		if (!user) {
			throw new Error(`No such user found ${email}`);
		}
		// 2. check if there password is correct
		const valid = await bcrypt.compare(password, user.password);
		if (!valid) {
			throw new Error('Invalid Password');
		}
		// 3. generate jwt token
		const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);

		// 4. set the cookie with the token.
		ctx.response.cookie('token', token, {
			httpOnly: true,
			maxAge: 1000 * 60 * 60 * 24 * 365 //Same as signin: Next time refactor it
		});
		// 5. return the user
		return user;
	},
	signout(parent, args, ctx, info) {
		ctx.response.clearCookie('token');
		return { message: 'Goodbye' };
	},
	async requestReset(parent, args, ctx, info) {
		//TODO:
		// 1. Check if this is a real user
		const user = await ctx.db.query.user({ where: { email: args.email } });
		if (!user) {
			throw new Error(`No such user found ${email}`);
		}
		// 2. Set a reset token and expiry on  that user.
		const randomBytesPromisified = promisify(randomBytes);
		const resetToken = (await randomBytesPromisified(20)).toString('hex');
		const resetTokenExpiry = Date.now() + 3600000; //1ht from now
		const res = await ctx.db.mutation.updateUser({
			where: { email: args.email },
			data: { resetToken, resetTokenExpiry }
		});
		console.log(res);
		return { message: 'Thanks!' };
		// 3. Email them that reset token
	},
	async resetPassword(parent, args, ctx, info) {
		//1. Check if the passwords match.
		if (args.password !== args.confirmPassword) {
			throw new Error("Passwords don't match");
		}
		//2. Check if its legit reset token
		//3. Check if its expired.
		//4. Hash their new password.
		// 5. Save the new password to the user and remove old reset token fields.
		// Generate JWT
		// Set the cookie
		// Return the new user
		// Thats it
	}
};

module.exports = Mutations;
