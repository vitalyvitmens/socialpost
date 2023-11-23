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
		location: {
			type: String,
			required: true,
		},
		speciality: {
			type: String,
			required: true,
		},
		avatar: {
			type: String,
			required: true,
			default:
				'https://github.com/vitalyvitmens/SQLite/blob/main/logo/avatar/avatar.JPG?raw=true',
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
		role: {
			type: Number,
			default: roles.USER,
		},
	},
	{ timestamps: true }
)

const User = mongoose.model('User', UserSchema)

module.exports = User
