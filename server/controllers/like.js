const Like = require('../models/Like');
const Post = require('../models/Post');

// add
async function addLike(postId, like) {
    const newLike = await Like.create(like);

    await Post.findByIdAndUpdate(postId, { $push: { likes: newLike } })

    await newLike.populate('author')

    return newLike;
}

// delete

async function deleteLike(postId, likeId) {
    await Like.deleteOne({_id: likeId});
    await Post.findByIdAndUpdate(postId, { $pull: { likes: likeId } })
}

module.exports = {
    addLike,
    deleteLike
}
