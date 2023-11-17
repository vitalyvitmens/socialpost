module.exports = function (user) {
	return {
		id: user.id,
		firstName: user.firstName,
		lastName: user.lastName,
		email: user.email,
		imageUrl: user.imageUrl,
		login: user.login,
		roleId: user.role,
		registeredAt: user.createdAt,
	}
}
