import { useMemo, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
	CreateUserPostSection,
	FriendsSection,
	Pagination,
	PostCard,
	Search,
	UserProfileSection,
} from './components'
import { LoaderSpinner } from '../../components'
import { useSelector } from 'react-redux'
import { selectUser } from '../../redux/selectors'
import { debounce } from './utils'
import { request } from '../../utils'
import { PAGINATION_LIMIT } from '../../constants'
import styled from 'styled-components'

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

	const onSearch = ({ target }) => {
		setSearchPhrase(target.value)
		startDelayedSearch(!shouldSearch)
	}

	return !authUser ? (
		navigate('/')
	) : (
		<div className={className}>
			<Search searchPhrase={searchPhrase} onChange={onSearch} />
			<div className="posts-and-user-profile-section">
				<div>
					<UserProfileSection users={users} authUser={authUser} />
					<FriendsSection users={users} />
				</div>
				{posts.length > 0 ? (
					<div className="post-list">
						<CreateUserPostSection />
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
					<LoaderSpinner />
				)}
			</div>
			{lastPage > 1 && posts.length > 0 && (
				<Pagination
					page={page}
					lastPage={lastPage}
					setPage={setPage}
					authUser={authUser}
				/>
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
`
