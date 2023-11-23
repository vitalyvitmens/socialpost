import { ACTION_TYPE } from './action-type'

export const removeLike = (likeId) => ({
	type: ACTION_TYPE.REMOVE_LIKE,
	payload: likeId,
})
