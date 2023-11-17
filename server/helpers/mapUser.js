module.exports = function (user) {
	return {
		id: user.id,
		firstName: user.firstName,
		lastName: user.lastName,
		email: user.email,
		login: user.login,
		roleId: user.role,
		imageUrl: post.picturePath,
		registeredAt: user.createdAt,
	}
}
