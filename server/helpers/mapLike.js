module.exports = function (like) {
	return {
		isLike: like.isLike,
		author: like?.author?.login,
		id: like._id,
		publishedAt: like.createdAt,
	}
}
