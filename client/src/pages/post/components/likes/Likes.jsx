import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Icon } from '../../../../components'
import { Like } from './components'
import { selectUserRole } from '../../../../redux/selectors'
import { addLikeAsync } from '../../../../redux/actions'
import { PROP_TYPE, ROLE } from '../../../../constants'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const LikesContainer = ({ className, likes, postId }) => {
	const [newLike, setNewLike] = useState(false)
	const userRole = useSelector(selectUserRole)
	const dispatch = useDispatch()

	const onNewLikeAdd = (postId, isLike) => {
		dispatch(addLikeAsync(postId, isLike))
		setNewLike(true)
		// setNewLike(newLike ? false : true)
	}

	const isGuest = userRole === ROLE.GUEST

	return (
		<div className={className}>
			{!isGuest && (
				<div className="new-like">
					{newLike ? (
						<Icon
							id="fa-heart"
							size="18px"
							margin="0 0 0 10px"
							onClick={() => onNewLikeAdd(postId, newLike)}
						/>
					) : (
						<Icon
							id="fa-heart-o"
							size="18px"
							margin="0 0 0 10px"
							onClick={() => onNewLikeAdd(postId, newLike)}
						/>
					)}
				</div>
			)}
			<div className="likes">
				{likes.map(({ id, author, isLike }) => (
					<Like
						key={id}
						postId={postId}
						id={id}
						author={author}
						isLike={isLike}
					/>
				))}
			</div>
		</div>
	)
}

export const Likes = styled(LikesContainer)`
	width: 580px;
	margin: 0 auto;

	& .new-like {
    padding-top: 40px;
		display: flex;
		width: 100%;
		margin: 20px 0 0;
	}

	& .new-like textarea {
		width: 550px;
		height: 120px;
    padding: 5px 10px;
		font-size: 18px;
		resize: none;
		background-color: antiquewhite;
    border-radius: 10px;
	}
`

Likes.propTypes = {
	likes: PropTypes.arrayOf(PROP_TYPE.like).isRequired,
	postId: PropTypes.string.isRequired,
}
