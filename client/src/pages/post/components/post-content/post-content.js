import { useSelector } from 'react-redux'
import { selectUser, selectUserRole } from '../../../../redux/selectors'
import { H2, Icon } from '../../../../components'
import { SpecialPanel } from '../special-panel/special-panel'
import { useNavigate } from 'react-router-dom'
import { PROP_TYPE, ROLE } from '../../../../constants'
import Moment from 'react-moment'
import styled from 'styled-components'

const PostContentContainer = ({
	className,
	post: { id, title, imageUrl, content, publishedAt, views, author },
}) => {
	const navigate = useNavigate()
	const userRole = useSelector(selectUserRole)
	const authUser = useSelector(selectUser)
	const isAdminOrModerator = [ROLE.ADMIN, ROLE.MODERATOR].includes(userRole)
	const authorPost = author === authUser.id

	return (
		<div className={className}>
			<img src={imageUrl} alt={title} />
			<H2>{title}</H2>
			<SpecialPanel
				id={id}
				publishedAt={<Moment date={publishedAt} format="DD-MM-YYYYг HH:mm" />}
				views={views}
        author={author}
				margin="-20px 0 20px"
				editButton={
					(isAdminOrModerator || authorPost) && (
						<Icon
							id="fa-pencil-square-o"
							size="21px"
							margin="0 10px 0 0"
							onClick={() => navigate(`/post/${id}/edit`)}
						/>
					)
				}
			/>
			<div className="post-text">{content}</div>
		</div>
	)
}
export const PostContent = styled(PostContentContainer)`
	& img {
		float: left;
		margin: 0 20px 10px 0;
		box-shadow: -5px 7px 10px #000;
		width: 667px;
	}

	& .post-text {
		font-size: 18px;
		white-space: pre-line;
	}
`

PostContent.propTypes = {
	post: PROP_TYPE.POST.isRequired,
}
