const Post = require('../models/Post')

// add
async function addPost(postId, post) {
	const newPost = await Post.create(post)

	await Post.findByIdAndUpdate(postId)

	await newPost.populate({
		path: 'comments',
		populate: 'author',
	})

	return newPost
}

// edit
async function editPost(id, post) {
	const newPost = await Post.findByIdAndUpdate(id, post, {
		returnDocument: 'after',
	})

	await newPost.populate({
		path: 'comments',
		populate: 'author',
	})

	return newPost
}

// delete
function deletePost(id) {
	return Post.deleteOne({ _id: id })
}

// get list with search and pagination
async function getPosts(search = '', limit = 9, page = 1) {
	const [posts, count] = await Promise.all([
		Post.find({ title: { $regex: search, $options: 'i' } })
			.limit(limit)
			.skip((page - 1) * limit)
			.sort({ updatedAt: -1 }),
		// .sort({ views: -1 }),
		Post.countDocuments({ title: { $regex: search, $options: 'i' } }),
	])

	return {
		posts,
		lastPage: Math.ceil(count / limit),
	}
}

// get item
async function getPost(id) {
	const post = await Post.findById(id).populate({
		path: 'comments',
		populate: 'author',
	})

	post.views = post.views + 1
	await post.save()
	return post
}

module.exports = {
	addPost,
	editPost,
	deletePost,
	getPosts,
	getPost,
}
