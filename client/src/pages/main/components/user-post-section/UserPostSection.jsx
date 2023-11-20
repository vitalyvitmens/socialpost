import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUser } from '../../../../redux/selectors'
import { Icon, Avatar, Button } from '../../../../components'
import styled from 'styled-components'

const CardProfile = styled.div`
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
	padding: 0 50px 0 10px;
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

const UserPostSectionContainer = ({ className }) => {
	const navigate = useNavigate()
	const user = useSelector(selectUser)

	!user && (
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
				<FlexJustifyEnd>
					<Column>
						<Row>
							<Avatar>{user.avatar}</Avatar>
						</Row>
						<Divider />
						<Row>
							<Icon id="fa-picture-o" onClick={() => navigate('/profile')} />
							<TextLight>фото</TextLight>
							<Icon id="fa-file-video-o" onClick={() => navigate('/profile')} />
							<TextLight>видео</TextLight>
							<Icon id="fa-file-text-o" onClick={() => navigate('/profile')} />
							<TextLight>файл</TextLight>
							<Icon id="fa-file-audio-o" onClick={() => navigate('/profile')} />
							<TextLight>аудио</TextLight>
							<Button>Запостить</Button>
						</Row>
					</Column>
				</FlexJustifyEnd>
			</CardProfile>
		</div>
	)
}
export const UserPostSection = styled(UserPostSectionContainer)`
	& .padding-left {
		padding-left: 30px;
	}
`
