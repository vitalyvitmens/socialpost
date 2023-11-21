module.exports = function (user) {
	return {
		id: user.id,
		firstName: user.firstName,
		lastName: user.lastName,
		email: user.email,
		location: user.location,
		job: user?.job,
		avatar: user.avatar,
		login: user.login,
		roleId: user.role,
		registeredAt: user.createdAt,
	}
}
