import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Avatar, Icon } from '../../../../components'
import Moment from 'react-moment'
import styled from 'styled-components'

const PostCardContainer = ({
	className,
	id,
	title,
	imageUrl,
	publishedAt,
	commentsCount,
	views,
	author,
	users,
}) => {
	console.log('author:', author)
	console.log('users:', users)
	// console.log(title)
	// console.log(imageUrl)
	// console.log(publishedAt)
	// console.log(commentsCount)
	// console.log(views)
	// console.log(avatar)

	function showAvatar(array, id) {
		array.map((item) => {
			if (item.id == id) {
				return item.avatar
			}
		})
	}

	!users.length && (
		<div className="no-posts-found">
			<Icon
				inactive={true}
				id="fa fa-refresh fa-spin fa-3x fa-fw"
				margin="0 7px 0 0"
				size="24px"
				aria-hidden="true"
			/>
			<span>Loading...</span>
		</div>
	)

	return (
		<div className={className}>
			<Link to={`/post/${id}`}>
				<img src={imageUrl} alt={title} />
				<div className="post-card-footer">
					<h4> {title}</h4>
					<Avatar>{showAvatar(users, author)}</Avatar>
					<div className="post-card-info">
						<div className="published-at">
							<Icon
								inactive={true}
								id="fa-calendar-o"
								margin="0 7px 0 0"
								size="18px"
							/>
							<Moment date={publishedAt} format="DD-MM-YYYYг HH:mm" />
						</div>
						<div className="views-comments-block">
							<div className="views-count">
								<Icon
									inactive={true}
									id="fa fa-eye"
									margin="0 7px 0 0"
									size="18px"
								/>
								{views}
							</div>
							<div className="comments-count">
								<Icon
									inactive={true}
									id="fa-comment-o"
									margin="0 7px 0 15px"
									size="18px"
								/>
								{commentsCount}
							</div>
						</div>
					</div>
				</div>
			</Link>
		</div>
	)
}

export const PostCard = styled(PostCardContainer)`
	display: flex;
	flex-direction: column;
	width: 515px;
	margin: 20px;
	border-radius: 10px;
	border: 1px solid #000;
	box-shadow: -5px 7px 10px #333;

	&:hover {
		opacity: 0.8;
		transform: translate(0, -3px);
	}

	&:active {
		opacity: 0.6;
		box-shadow: none;
	}

	& img {
		border-radius: 10px 10px 0 0;
		display: block;
		width: 100%;
	}

	& .post-card-footer {
		padding: 5px;
		border-top: 1px solid #000;
	}

	& h4 {
		margin: 0;
		color: #004d99;

		&:hover {
			text-decoration: underline;
		}
	}

	& .post-card-info {
		display: flex;
		justify-content: space-between;
		margin-top: 5px;
		padding: 0 1px;
	}

	& .published-at {
		display: flex;
	}

	& .views-comments-block {
		display: flex;
	}

	& .views-count {
		display: flex;
	}

	& .comments-count {
		display: flex;
	}

	& .no-posts-found {
		font-size: 24px;
		margin-top: 40px;
		text-align: center;
	}
`

PostCard.propTypes = {
	id: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	imageUrl: PropTypes.string.isRequired,
	publishedAt: PropTypes.string.isRequired,
	commentsCount: PropTypes.number.isRequired,
	views: PropTypes.number.isRequired,
}
