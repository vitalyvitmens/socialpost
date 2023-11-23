const mongoose = require('mongoose')
const mapComment = require('./mapComment')

module.exports = function (post) {
	return {
		id: post.id,
		title: post.title,
		imageUrl: post.image,
		content: post.content,
		comments: post.comments.map((comment) =>
			mongoose.isObjectIdOrHexString(comment) ? comment : mapComment(comment)
		),
		likes: post.likes.map((like) =>
			mongoose.isObjectIdOrHexString(like) ? like : mapLike(like)
		),
		views: post.views,
    author: post.author,
		publishedAt: post.createdAt,
	}
}
