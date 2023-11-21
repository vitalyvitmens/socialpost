import { Link, useNavigate } from 'react-router-dom'
import { Icon, Avatar } from '../../../../components'
import styled from 'styled-components'

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

const Divider = styled.div`
	margin: 20px;
	border-top: 3px solid gray;
`

const TextDark = styled.div`
	display: flex;
	color: black;
	font-size: 1.5rem;
	font-weight: bold;
	padding-bottom: 40px;
`

const UserProfileSectionContainer = ({ className, users, authUser }) => {
	const navigate = useNavigate()

	return !authUser ? (
		navigate('/')
	) : (
		<div className={className}>
			<CardProfile>
				<TextDark>Мой профиль</TextDark>
				<FlexJustifyEnd>
					<Avatar>{authUser.avatar}</Avatar>
					<Column>
						<Row>
							{authUser.lastName} {authUser.firstName}
						</Row>
						<TextLight>{users.length - 1} друзей</TextLight>
					</Column>
					<Down>
						<Icon id="fa-cog fa-x" onClick={() => navigate('/profile')} />
					</Down>
				</FlexJustifyEnd>
				<Divider />
				<FlexJustifyEnd>
					<Column>
						<Row>
							<Icon
								id="fa-map-marker fa-2x"
								// onClick={onSave}
							/>
							<TextLight>{authUser.location}</TextLight>
						</Row>
						<Row>
							<Icon
								id="fa fa-briefcase fa-x"
								// onClick={onSave}
							/>
							<TextLight>{authUser.speciality}</TextLight>
						</Row>
					</Column>
				</FlexJustifyEnd>
				<Divider />
				<FlexJustifyEnd>
					<Column>
						<Row>
							<TextLight>Просмотры профиля</TextLight>
							<div>
								{`: `}
								{4394}
							</div>
						</Row>
						<Row>
							<TextLight>Показы поста</TextLight>
							<div>
								{`: `}
								{9927}
							</div>
						</Row>
					</Column>
				</FlexJustifyEnd>
				<Divider />
				<FlexJustifyEnd>
					<Column>
						<Row>
							<Link to={'https://vk.com/id194055771'}>
								<img
									src={
										'https://github.com/vitalyvitmens/SQLite/blob/main/logo/vk_logo.png?raw=true'
									}
									alt={'VK'}
								/>
							</Link>
							<TextLight>ВКОНТАКТЕ</TextLight>
						</Row>
						<Row>
							<Link to={'https://github.com/vitalyvitmens'}>
								<img
									src={
										'https://github.com/vitalyvitmens/SQLite/blob/main/logo/GitHub_logo.png?raw=true'
									}
									alt={'GitHub'}
								/>
							</Link>
							<TextLight>GitHub</TextLight>
						</Row>
					</Column>
				</FlexJustifyEnd>
			</CardProfile>
		</div>
	)
}
export const UserProfileSection = styled(UserProfileSectionContainer)`
	& .padding-left {
		padding-left: 30px;
	}
`
