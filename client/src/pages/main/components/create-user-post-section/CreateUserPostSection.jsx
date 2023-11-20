import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { selectPost, selectUser } from '../../../../redux/selectors'
import { Icon, Avatar, Button, Input } from '../../../../components'
import { savePostAsync } from '../../../../redux/actions'
import styled from 'styled-components'

const CardProfile = styled.div`
	display: flex;
	flex-direction: column;
	width: 710px;
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
	padding: 20px 0px;
`

const FlexJustifyEnd = styled.div`
	display: flex;
`

const TextLight = styled.div`
	display: flex;
	padding: 0 58px 0 10px;
	color: gray;
	align-items: center;
`

const Divider = styled.div`
	margin: -10px 25px 0 20px;
	border-top: 3px solid gray;
`

const CreateUserPostSectionContainer = ({ className }) => {
	const [titleValue, setTitleValue] = useState('')
	const [imageUrlValue, setImageUrlValue] = useState('')
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const user = useSelector(selectUser)
	const { id } = useSelector(selectPost)

	const onSave = () => {
		dispatch(
			savePostAsync(id, {
				imageUrl: imageUrlValue
					? imageUrlValue
					: 'https://github.com/vitalyvitmens/news-blog/blob/main/frontend/src/img/001.jpg?raw=true',
				title: titleValue ? titleValue : 'Заполните название статьи!',
				content: `Автор поста: ${user.lastName} ${user.firstName}`,
			})
		).then(({ id }) => navigate(`/post/${id}`))
	}

	const onImageChange = ({ target }) => setImageUrlValue(target.value)
	const onTitleChange = ({ target }) => setTitleValue(target.value)
	console.log(titleValue)

	return !user ? (
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
	) : (
		<div className={className}>
			<CardProfile>
				<FlexJustifyEnd>
					<Column>
						<Row>
							<Avatar>{user.avatar}</Avatar>
							<Input
								width="575px"
								height="40px"
								placeholder="Напишите о чём Вы думаете..."
								onChange={onTitleChange}
							/>
						</Row>
						<Row>
							<Input
								width="575px"
								height="40px"
								margin="-30px 0 10px 90px"
								placeholder="Интернет ссылка на фото..."
								onChange={onImageChange}
							/>
						</Row>
					</Column>
				</FlexJustifyEnd>
				<Divider />
				<FlexJustifyEnd>
					<Column>
						<Row>
							<Icon id="fa-picture-o" onClick={() => navigate('/profile')} />
							<TextLight>фото</TextLight>
							<Icon id="fa-file-video-o" onClick={() => navigate('/profile')} />
							<TextLight>видео</TextLight>
							<Icon id="fa-file-text-o" onClick={() => navigate('/profile')} />
							<TextLight>файл</TextLight>
							<Icon id="fa-file-audio-o" onClick={() => navigate('/profile')} />
							<TextLight>аудио</TextLight>
							<Button margin="0 0 0 0" onClick={onSave}>
								Запостить
							</Button>
						</Row>
					</Column>
				</FlexJustifyEnd>
			</CardProfile>
		</div>
	)
}
export const CreateUserPostSection = styled(CreateUserPostSectionContainer)`
	& .padding-left {
		padding-left: 30px;
	}
`
