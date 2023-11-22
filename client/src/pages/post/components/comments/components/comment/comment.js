import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Avatar, Icon } from '../../../../../../components'
import {
	CLOSE_MODAL,
	openModal,
	removeCommentAsync,
} from '../../../../../../redux/actions'
import { selectUserRole } from '../../../../../../redux/selectors'
import { ROLE } from '../../../../../../constants'
import { request } from '../../../../../../utils'
import Moment from 'react-moment'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const CommentContainer = ({
	className,
	postId,
	id,
	author,
	publishedAt,
	content,
}) => {
	const [users, setUsers] = useState([])
	const dispatch = useDispatch()
	const userRole = useSelector(selectUserRole)

	const onCommentRemove = (id) => {
		dispatch(
			openModal({
				text: 'Удалить комментарий?',
				onConfirm: () => {
					dispatch(removeCommentAsync(postId, id))
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
			<div className="comment">
				<div className="information-panel">
					<div className="author">
						{users.map((user) => (
							<React.Fragment key={user.id}>
								{user.login.includes(author) ? (
									<>
										<Avatar className="avatar" width="40px" height="40px">
											{user.avatar}
										</Avatar>
										<div className="user-lastname-firstname">
											{user.lastName} {user.firstName}
										</div>
									</>
								) : null}
							</React.Fragment>
						))}
					</div>
					<div className="published-at">
						<Icon
							inactive={true}
							id="fa-calendar-o"
							size="14px"
							margin="0 5px 0 0"
							onClick={() => {}}
						/>
						<Moment date={publishedAt} format="DD-MM-YYYYг HH:mm" />
					</div>
				</div>
				<div className="comment-text">{content}</div>
			</div>
			{isAdminOrModerator && (
				<Icon
					id="fa-trash-o"
					size="21px"
					margin="0 0 0 10px"
					onClick={() => onCommentRemove(id)}
				/>
			)}
		</div>
	)
}

export const Comment = styled(CommentContainer)`
	display: flex;
	margin-top: 10px;
	background-color: antiquewhite;

	& .user-lastname-firstname {
		padding-top: 5px;
		font-weight: 500;
		font-size: 1.05rem;
	}

	& .comment {
		border: 1px solid #000;
		width: 550px;
		padding: 5px 10px;
		border-radius: 10px;
	}

	& .information-panel {
		display: flex;
		justify-content: space-between;
	}

	& .author {
		display: flex;
	}

	& .published-at {
		display: flex;
    color: gray;
    font-size: 0.9rem;
	}

  & .comment-text {
    display: flex;
    padding-top: 10px;
  }
`

Comment.propTypes = {
	postId: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	author: PropTypes.string.isRequired,
	publishedAt: PropTypes.string.isRequired,
	content: PropTypes.string.isRequired,
}
