import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Avatar, Icon } from '../../../../components'
import Moment from 'react-moment'
import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadPostAsync, loadUserAsync } from '../../../../redux/actions'
import { selectUser } from '../../../../redux/selectors'
import { request } from '../../../../utils'

const Row = styled.div`
	display: flex;
	flex-direction: row;
	font-size: 20px;
	font-weight: 600;
	align-items: center;
`

const Column = styled.div`
	display: flex;
	flex-direction: column;
	align-items: start;
	justify-content: space-around;
	padding: 15px 0px;
`

const PostCardContainer = ({
	className,
	id,
	title,
	imageUrl,
	publishedAt,
	commentsCount,
	views,
	author,
}) => {
	const [users, setUsers] = useState([])

	useEffect(() => {
		request('/users').then((usersRes) => {
			setUsers(usersRes.data)
		})
	}, [])

	// !users.length && (
	// 	<div className="no-posts-found">
	// 		<Icon
	// 			inactive={true}
	// 			id="fa fa-refresh fa-spin fa-3x fa-fw"
	// 			margin="0 7px 0 0"
	// 			size="24px"
	// 			aria-hidden="true"
	// 		/>
	// 		<span>Loading...</span>
	// 	</div>
	// )

	return (
		<div className={className}>
			{users.map((user) => (
				<>
					{user.id.includes(author) ? (
						<Row>
							<Avatar className="avatar">{user.avatar}</Avatar>
							<Column>
								{user.lastName} {user.firstName}
								<div>Беларусь</div>
							</Column>
							<Icon
								className="icon"
								id="fa-user-plus fa-x"
								// onClick={onSave}
							/>
						</Row>
					) : null}
				</>
			))}

			<Link to={`/post/${id}`}>
				<h4>{title}</h4>
				<img src={imageUrl} alt={title} />
			</Link>
			<div className="post-card-footer">
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
						<Icon
							inactive={true}
							id="fa fa-heart-o"
							margin="0 7px 0 15px"
							size="18px"
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export const PostCard = styled(PostCardContainer)`
	display: flex;
	flex-direction: column;
	width: 710px;
	margin: 20px;
	padding: 20px;
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
		border-radius: 10px;
		display: block;
		width: 100%;
	}

	& .avatar {
		display: flex;
		width: 80px;
		height: 80px;
		object-fit: cover;
		border-radius: 50%;
		margin-right: 10px;
		padding: 2px;

		&:hover {
			opacity: 0.8;
			cursor: pointer;
		}

		&:active {
			opacity: 0.6;
		}
	}

	& .post-card-footer {
		padding: 5px;
	}

	& h4 {
		padding: 20px 0;
		margin: 0;
		color: gray;
		font-size: 1.25rem;

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

	& .icon {
		display: flex;
		text-align: end;
		justify-content: end;
		align-items: end;
		padding-left: 350px;
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
