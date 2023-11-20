import { useMemo, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
	FriendsSection,
	Pagination,
	PostCard,
	Search,
	UserPostSection,
	UserProfileSection,
} from './components'
import { PAGINATION_LIMIT } from '../../constants'
import { debounce } from './utils'
import { request } from '../../utils'
import { Icon } from '../../components'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { selectUser } from '../../redux/selectors'

const MainContainer = ({ className }) => {
	const navigate = useNavigate()
	const authUser = useSelector(selectUser)
	const [posts, setPosts] = useState([])
	const [users, setUsers] = useState([])
	const [page, setPage] = useState(1)
	const [lastPage, setLastPage] = useState(1)
	const [searchPhrase, setSearchPhrase] = useState('')
	const [shouldSearch, setShouldSearch] = useState(false)

	useEffect(() => {
		request(
			`/posts?search=${searchPhrase}&page=${page}&limit=${PAGINATION_LIMIT}`
		).then(({ data: { posts, lastPage } }) => {
			setPosts(posts)
			setLastPage(lastPage)
		})

		request('/users').then((user) => {
			setUsers(user.data)
		})
	}, [page, searchPhrase, shouldSearch])

	const startDelayedSearch = useMemo(() => debounce(setShouldSearch, 2000), [])

	if (!authUser || !posts || !users) {
		return (
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
	}

	const onSearch = ({ target }) => {
		setSearchPhrase(target.value)
		startDelayedSearch(!shouldSearch)
	}

	return (
		<div className={className}>
			<Search searchPhrase={searchPhrase} onChange={onSearch} />
			<div className="posts-and-user-profile-section">
				<div>
					<UserProfileSection />
					<FriendsSection />
				</div>
				{posts.length > 0 ? (
					<div className="post-list">
						<UserPostSection />
						{posts.map(
							({
								id,
								title,
								imageUrl,
								publishedAt,
								comments,
								views,
								author,
							}) => (
								<PostCard
									key={id}
									id={id}
									title={title}
									imageUrl={imageUrl}
									publishedAt={publishedAt}
									commentsCount={comments.length}
									views={views}
									author={author}
									users={users}
								/>
							)
						)}
					</div>
				) : (
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
				)}
			</div>
			{lastPage > 1 && posts.length > 0 && (
				<Pagination page={page} lastPage={lastPage} setPage={setPage} />
			)}
		</div>
	)
}

export const Main = styled(MainContainer)`
	display: flex;
	flex-direction: column;

	& .posts-and-user-profile-section {
		display: flex;
		justify-content: space-around;
		padding: 20px;
	}

	& .post-list {
		display: flex;
		justify-content: end;
		flex-wrap: wrap;
		padding-bottom: 80px;
	}

	& .no-posts-found {
		font-size: 24px;
		margin-top: 40px;
		text-align: center;
	}
`
