const mongoose = require('mongoose')
const roles = require('../constants/roles')

const UserSchema = mongoose.Schema(
	{
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		login: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		picturePath: {
			type: String,
			default: '',
		},
		role: {
			type: Number,
			default: roles.USER,
		},
	},
	{ timestamps: true }
)

const User = mongoose.model('User', UserSchema)

module.exports = User
