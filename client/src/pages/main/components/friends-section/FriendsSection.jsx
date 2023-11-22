import React from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../../../../redux/selectors'
import { useNavigate } from 'react-router-dom'
import { Icon, Avatar, LoaderSpinner } from '../../../../components'
import styled from 'styled-components'

const CardProfile = styled.div`
	display: flex;
	flex-direction: column;
	width: 420px;
	margin: 40px 20px;
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

const FriendsSectionContainer = ({ className, users }) => {
	const navigate = useNavigate()
	const authUser = useSelector(selectUser)

	!authUser || (!users && <LoaderSpinner />)

	return !authUser || !users ? (
		navigate('/')
	) : (
		<div className={className}>
			<CardProfile>
				<TextDark>Мои друзья</TextDark>
				{users.map((user) => (
					<React.Fragment key={user.id}>
						{user.id.includes(authUser.id) ? null : (
							<FlexJustifyEnd>
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
										onClick={() =>
											console.log(
												`Вы удалили друга: ${user.lastName} ${user.firstName}`
											)
										}
									/>
								</Down>
							</FlexJustifyEnd>
						)}
					</React.Fragment>
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
