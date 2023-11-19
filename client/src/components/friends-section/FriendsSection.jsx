import { Icon } from '../icon/icon'
import { Avatar } from '../avatar/avatar'
import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { request } from '../../utils'

const CardProfile = styled.div`
	display: flex;
	flex-direction: column;
	width: 420px;
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
`

const Row = styled.div`
	display: flex;
	flex-direction: row;
	font-size: 20px;
	font-weight: 600;
	padding: 0 20px;
	margin-right: 1.5em;
`

const Column = styled.div`
	display: flex;
	flex-direction: column;
	align-items: start;
	justify-content: space-around;
	padding: 15px 0px;
`

const FlexJustifyEnd = styled.div`
	display: flex;
	padding-bottom: 20px;
	justify-content: space-around;
`

const Down = styled.div`
	display: flex;
	align-items: end;
`
const TextLight = styled.div`
	display: flex;
	padding-left: 20px;
	color: gray;
	align-items: center;
`

const TextDark = styled.div`
	display: flex;
	color: black;
	font-size: 1.5rem;
	font-weight: bold;
	padding-bottom: 40px;
`

const FriendsSectionContainer = ({ className }) => {
	const [users, setUsers] = useState([])

	useEffect(() => {
		request('/users').then((usersRes) => {
			setUsers(usersRes.data)
		})
	}, [])

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
			<CardProfile>
				<TextDark>Мои друзья</TextDark>
				{users.map((user) => (
					<FlexJustifyEnd key={user.id}>
						<Avatar>{user.avatar}</Avatar>
						<Column>
							<Row>
								{user.lastName} {user.firstName}
							</Row>
							<TextLight>{user.email}</TextLight>
						</Column>
						<Down>
							<Icon
								id="fa fa-user-times fa-x"
								onClick={() => console.log('Вы удалили друга')}
							/>
						</Down>
					</FlexJustifyEnd>
				))}
			</CardProfile>
		</div>
	)
}
export const FriendsSection = styled(FriendsSectionContainer)`
	& .padding-left {
		padding-left: 30px;
	}
`
