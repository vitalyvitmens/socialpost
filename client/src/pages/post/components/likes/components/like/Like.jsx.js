import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Avatar, Icon } from '../../../../../../components'
import {
	CLOSE_MODAL,
	openModal,
	removeLikeAsync,
} from '../../../../../../redux/actions'
import { selectUser } from '../../../../../../redux/selectors'
import { ROLE } from '../../../../../../constants'
import { request } from '../../../../../../utils'
import Moment from 'react-moment'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const LikeContainer = ({
	className,
	postId,
	id,
	author,
	publishedAt,
	isLike,
}) => {
	const [users, setUsers] = useState([])
	const dispatch = useDispatch()
	const authUser = useSelector(selectUser)
	const userRole = authUser.roleId
	const authorLike = author === authUser.login

	const onLikeRemove = (id) => {
		dispatch(
			openModal({
				text: 'Удалить комментарий?',
				onConfirm: () => {
					dispatch(removeLikeAsync(postId, id))
					dispatch(CLOSE_MODAL)
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			})
		)
	}

	const isAdminOrModerator = [ROLE.ADMIN, ROLE.MODERATOR].includes(userRole)

	useEffect(() => {
		request('/users').then((usersRes) => {
			setUsers(usersRes.data)
		})
	}, [])

	return (
		<div className={className}>
			<div className="like">
				<div className="information-panel">
					<div className="author">
						{users.map((user) => (
							<React.Fragment key={user.id}>
								{user.login.includes(author) ? (
									<>
									</>
								) : null}
							</React.Fragment>
						))}
					</div>
				</div>
				<div className="like-text">{isLike}</div>
			</div>
			{(isAdminOrModerator || authorLike) && (
				<Icon
					id="fa-trash-o"
					size="21px"
					margin="0 0 0 10px"
					onClick={() => onLikeRemove(id)}
				/>
			)}
		</div>
	)
}

export const Like = styled(LikeContainer)`
	display: flex;
	margin-top: 10px;
	background-color: antiquewhite;

	& .user-lastname-firstname {
		padding-top: 5px;
		font-weight: 500;
		font-size: 1.05rem;
	}

	& .like {
		border: 1px solid #000;
		width: 550px;
		padding: 5px 10px;
		border-radius: 10px;
	}

	& .information-panel {
		display: flex;
		justify-isLike: space-between;
	}

	& .author {
		display: flex;
	}

	& .published-at {
		display: flex;
		color: gray;
		font-size: 0.9rem;
	}

	& .like-text {
		display: flex;
		padding-top: 10px;
	}
`

Like.propTypes = {
	postId: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	author: PropTypes.string.isRequired,
	publishedAt: PropTypes.string.isRequired,
	isLike: PropTypes.string.isRequired,
}
