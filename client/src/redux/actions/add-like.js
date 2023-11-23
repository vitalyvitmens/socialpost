import { ACTION_TYPE } from './action-type'

export const addLike = (like) => ({
	type: ACTION_TYPE.ADD_LIKE,
	payload: like,
})
