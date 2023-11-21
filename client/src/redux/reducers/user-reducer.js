import { ACTION_TYPE } from '../actions'
import { ROLE } from '../../constants'

const initialUserState = {
	id: '',
	firstName: '',
	lastName: '',
	email: '',
	location: '',
	speciality: '',
	avatar: '',
	login: '',
	roleId: ROLE.GUEST,
	session: '',
}

export const userReducer = (state = initialUserState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_USER:
			return {
				...state,
				...action.payload,
			}
		case ACTION_TYPE.SET_USER_DATA:
			return {
				...state,
				...action.payload,
			}
		case ACTION_TYPE.LOGOUT:
			return initialUserState
		default:
			return state
	}
}
