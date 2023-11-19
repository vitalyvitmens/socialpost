import { request } from '../../utils/request'
import { setUserData } from './set-user-data'

export const loadUserAsync = (userId) => (dispatch) =>
	request(`/users/${userId}`).then((userData) => {
		if (userData.data) {
			dispatch(setUserData(userData.data))
		}

		return userData
	})
