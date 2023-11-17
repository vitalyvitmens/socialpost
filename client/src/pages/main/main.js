import { useMemo, useEffect, useState } from 'react'
import { Pagination, PostCard, Search } from './components'
import { PAGINATION_LIMIT } from '../../constants'
import { debounce } from './utils'
import { request } from '../../utils'
import { Icon } from '../../components'
import styled from 'styled-components'

const MainContainer = ({ className }) => {
	const [posts, setPosts] = useState([])
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page, shouldSearch])

	const startDelayedSearch = useMemo(() => debounce(setShouldSearch, 2000), [])

	const onSearch = ({ target }) => {
		setSearchPhrase(target.value)
		startDelayedSearch(!shouldSearch)
	}

	return (
		<div className={className}>
			<div className="posts-and-search">
				<Search searchPhrase={searchPhrase} onChange={onSearch} />
				{posts.length > 0 ? (
					<div className="post-list">
						{posts.map(
							({ id, title, imageUrl, publishedAt, comments, views }) => (
								<PostCard
									key={id}
									id={id}
									title={title}
									imageUrl={imageUrl}
									publishedAt={publishedAt}
									commentsCount={comments.length}
									views={views}
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
	justify-content: space-between;

	& .post-list {
		display: flex;
		flex-wrap: wrap;
		padding: 20px 20px 80px;
	}

	& .no-posts-found {
		font-size: 24px;
		margin-top: 40px;
		text-align: center;
	}
`
