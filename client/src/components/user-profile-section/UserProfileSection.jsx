import { useSelector } from 'react-redux'
import { selectUser } from '../../redux/selectors'
import { Icon } from '../icon/icon'
import { Avatar } from '../avatar/avatar'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

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
	// justify-content: space-around;
`
const Down = styled.div`
	display: flex;
	align-items: end;
`

const UserProfileSectionContainer = ({ className }) => {
	const navigate = useNavigate()
	const user = useSelector(selectUser)

	return (
		<div className={className}>
			<CardProfile>
				<FlexJustifyEnd>
					<Avatar>{user.avatar}</Avatar>
					<Column>
						<Row>
							{user.lastName} {user.firstName}
						</Row>
						<Row>{2} друзей</Row>
					</Column>
					<Down>
						<Icon id="fa-cog fa-x" onClick={() => navigate('/profile')} />
					</Down>
				</FlexJustifyEnd>
				<div className="divider"></div>
				<FlexJustifyEnd>
					<Column>
						<Row>
							<Icon
								id="fa-map-marker fa-x"
								// onClick={onSave}
							/>
							<div className='padding-left'>Беларусь</div>
						</Row>
						<Row>
							<Icon
								id="fa fa-briefcase fa-x"
								// onClick={onSave}
							/>
							<div className='padding-left'>ReactJS Developer</div>
						</Row>
					</Column>
				</FlexJustifyEnd>
				<div className="divider"></div>
				<FlexJustifyEnd>
					<Column>
						<Row>
							<div>Просмотры профиля {4394}</div>
						</Row>
						<Row>
							<div>Показы поста {9394}</div>
						</Row>
					</Column>
				</FlexJustifyEnd>
				<div className="divider"></div>
				<FlexJustifyEnd>
					<Column>
						<Row>
							<div>Просмотры профиля {4394}</div>
						</Row>
						<Row>
							<div>Показы поста {9394}</div>
						</Row>
					</Column>
				</FlexJustifyEnd>
				<div className="divider"></div>
			</CardProfile>
		</div>
	)
}
export const UserProfileSection = styled(UserProfileSectionContainer)`
	& .divider {
		margin: 20px;
		border-top: 3px solid gray;
	}

  & .padding-left {
    padding-left: 30px;
  }
`
