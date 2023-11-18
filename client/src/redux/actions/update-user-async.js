import { request } from '../../utils'
import { setUserData } from '../../redux/actions'

export const updateUserAsync = (id, newUserData) => async (dispatch) => {
	const saveRequest = id
		? request(`/users/${id}`, 'PUT', newUserData)
		: request('/users', 'POST', newUserData)

	const updatedUser = await saveRequest
	dispatch(setUserData(updatedUser.data))
	return updatedUser.data
}
