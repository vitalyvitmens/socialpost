import { request } from '../../utils/request'
import { addLike } from './add-like'

export const addLikeAsync = (postId, isLike) => (dispatch) => {
	request(`/posts/${postId}/likes`, 'POST', { isLike }).then((like) => {
		dispatch(addLike(like.data))
	})
}
