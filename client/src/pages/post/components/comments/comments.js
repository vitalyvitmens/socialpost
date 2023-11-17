import PropTypes from 'prop-types'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Icon } from '../../../../components'
import { Comment } from './components'
import { selectUserRole } from '../../../../redux/selectors'
import { addCommentAsync } from '../../../../redux/actions'
import { PROP_TYPE, ROLE } from '../../../../constants'
import styled from 'styled-components'

const CommentsContainer = ({ className, comments, postId }) => {
	const [newComment, setNewComment] = useState('')
	const userRole = useSelector(selectUserRole)
	const dispatch = useDispatch()

	const onNewCommentAdd = (postId, content) => {
		dispatch(addCommentAsync(postId, content))
		setNewComment('')
	}

	const isGuest = userRole === ROLE.GUEST

	return (
		<div className={className}>
			{!isGuest && (
				<div className="new-comment">
					<textarea
						name="comment"
						value={newComment}
						placeholder="Комментарий..."
						onChange={({ target }) => setNewComment(target.value)}
					></textarea>
					{newComment ? (
						<Icon
							id="fa-paper-plane-o"
							size="18px"
							margin="0 0 0 10px"
							onClick={() => onNewCommentAdd(postId, newComment)}
						/>
					) : (
						<Icon
							id="fa-paper-plane-o"
							size="18px"
							margin="0 0 0 10px"
							disabled={true}
						/>
					)}
				</div>
			)}
			<div className="comments">
				{comments.map(({ id, author, content, publishedAt }) => (
					<Comment
						key={id}
						postId={postId}
						id={id}
						author={author}
						content={content}
						publishedAt={publishedAt}
					/>
				))}
			</div>
		</div>
	)
}

export const Comments = styled(CommentsContainer)`
	width: 580px;
	margin: 0 auto;

	& .new-comment {
		display: flex;
		width: 100%;
		margin: 20px 0 0;
	}

	& .new-comment textarea {
		width: 550px;
		height: 120px;
		font-size: 18px;
		resize: none;
		background-color: antiquewhite;
	}
`

Comments.propTypes = {
	comments: PropTypes.arrayOf(PROP_TYPE.COMMENT).isRequired,
	postId: PropTypes.string.isRequired,
}
