import { ACTION_TYPE } from '../actions'

const initialPostState = {
	id: '',
	title: '',
	imageUrl: '',
	content: '',
	publishedAt: '',
	comments: [],
	likes: [],
	views: 0,
	author: '',
}

export const postReducer = (state = initialPostState, action) => {
	switch (action.type) {
		case ACTION_TYPE.ADD_COMMENT:
			return {
				...state,
				comments: [...state.comments, action.payload],
			}
		case ACTION_TYPE.REMOVE_COMMENT:
			return {
				...state,
				comments: state.comments.filter(
					(comment) => comment.id !== action.payload
				),
			}
		case ACTION_TYPE.ADD_LIKE:
			return {
				...state,
				likes: [...state.likes, action.payload],
			}
		case ACTION_TYPE.REMOVE_LIKE:
			return {
				...state,
				likes: state.likes.filter((like) => like.id !== action.payload),
			}
		case ACTION_TYPE.SET_POST_DATA:
			return {
				...state,
				...action.payload,
			}
		case ACTION_TYPE.RESET_POST_DATA:
			return initialPostState
		default:
			return state
	}
}
