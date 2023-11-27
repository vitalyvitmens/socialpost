import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectPost, selectUser } from '../../../../redux/selectors'
import { savePostAsync } from '../../../../redux/actions'
import {
	Icon,
	Avatar,
	Button,
	Input,
	LoaderSpinner,
} from '../../../../components'
import { isImageURL } from '../../../../utils'
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
	padding: 0 52px 0 10px;
	color: gray;
	align-items: start;
`

const Divider = styled.div`
	margin: -10px 25px 0 20px;
	border-top: 3px solid gray;
`

const ErrorField = styled.div`
	display: flex;
	margin: -15px 12px 5px 130px;
	color: rgb(194 65 12);
	font-size: 12px;
`

const CreateUserPostSectionContainer = ({ className }) => {
	const [imageUrlVal, setImageUrlVal] = useState('')
	const [titleVal, setTitleVal] = useState('')

	const authUser = useSelector(selectUser)
	const { id } = useSelector(selectPost)

	const dispatch = useDispatch()

	const onSave = () => {
		dispatch(
			savePostAsync(id, {
				imageUrl: imageUrlVal
					? imageUrlVal
					: 'https://github.com/vitalyvitmens/socialpost/blob/main/client/public/assets/image/whereposts.jpg?raw=true',
				title: titleVal
					? titleVal
					: `ADMIN: ${authUser.lastName} ${authUser.firstName} добавь заголовок к своему посту!`,
				content: `Автор поста: ${authUser.lastName} ${authUser.firstName}`,
			})
		)

		window.location.reload()
	}

	const onImageChange = ({ target }) => setImageUrlVal(target.value)
	const onTitleChange = ({ target }) => setTitleVal(target.value)

	return !authUser ? (
		<LoaderSpinner />
	) : (
		<div className={className}>
			<CardProfile>
				<FlexJustifyEnd>
					<Column>
						{imageUrlVal.length ? (
							<ErrorField>{isImageURL(imageUrlVal)}</ErrorField>
						) : null}
						<Row>
							<Avatar>{authUser.avatar}</Avatar>
							<Input
								id="imageUrlVal"
								name="imageUrlVal"
								value={imageUrlVal}
								width="575px"
								height="40px"
								placeholder="Интернет ссылка (URL) на фото..."
								onChange={onImageChange}
							/>
						</Row>
						<Row>
							<Input
								id="titleVal"
								name="titleVal"
								value={titleVal}
								width="575px"
								height="40px"
								margin="-30px 0 10px 90px"
								placeholder="Напишите о чём Вы думаете..."
								onChange={onTitleChange}
							/>
						</Row>
					</Column>
				</FlexJustifyEnd>
				<Divider />
				<FlexJustifyEnd>
					<Column>
						<Row>
							<Icon
								id="fa-picture-o"
								onClick={() =>
									(window.location.href =
										'https://yandex.by/images/search?lr=157&nl=1&rdrnd=442586&redircnt=1700658614.1&source=morda&text=%D0%91%D0%B5%D0%BB%D0%BE%D0%B5%20%D0%9C%D0%BE%D1%80%D0%B5')
								}
							/>
							<TextLight>фото</TextLight>
							<Icon
								id="fa-file-video-o"
								onClick={() =>
									(window.location.href = 'https://www.youtube.com/')
								}
							/>
							<TextLight>видео</TextLight>
							<Icon
								id="fa-file-text-o"
								onClick={() =>
									(window.location.href =
										'https://raw.githubusercontent.com/vitalyvitmens/SQLite/main/logo/diplomas/MSHFTC.jpg')
								}
							/>
							<TextLight>файл</TextLight>
							<Icon
								id="fa-file-audio-o"
								onClick={() =>
									(window.location.href = 'https://dushevnoeradio.by/')
								}
							/>
							<TextLight>аудио</TextLight>
							<Button
								margin="0 0 0 0"
								width="120px"
								height="50px"
								inactive={isImageURL(imageUrlVal)}
								disabled={
									!imageUrlVal ||
									!titleVal ||
									!authUser ||
									isImageURL(imageUrlVal)
								}
								onClick={() => onSave()}
							>
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
