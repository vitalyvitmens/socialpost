const mongoose = require('mongoose')

const LikeSchema = mongoose.Schema(
	{
		isLike: {
			type: String,
			required: true,
		},
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
	},
	{ timestamps: true }
)

const Like = mongoose.model('Like', LikeSchema)

module.exports = Like
