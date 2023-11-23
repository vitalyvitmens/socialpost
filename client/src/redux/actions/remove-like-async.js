import { request } from '../../utils/request'
import { removeLike } from './remove-like'

export const removeLikeAsync = (postId, id) => (dispatch) => {
	request(`/posts/${postId}/likes/${id}`, 'DELETE').then(() => {
		dispatch(removeLike(id))
	})
}
