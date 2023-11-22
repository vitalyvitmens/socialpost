import { useLayoutEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Icon, Input } from '../../../../components'
import { SpecialPanel } from '../special-panel/special-panel'
import { savePostAsync } from '../../../../redux/actions'
import { sanitizeContent } from './utils'
import { PROP_TYPE } from '../../../../constants'
import Moment from 'react-moment'
import styled from 'styled-components'

const PostFormContainer = ({
	className,
	post: { id, imageUrl, title, content, publishedAt, views },
}) => {
	const [imageUrlValue, setImageUrlValue] = useState(imageUrl)
	const [titleValue, setTitleValue] = useState(title)
	const contentRef = useRef(null)

	useLayoutEffect(() => {
		setImageUrlValue(imageUrl)
		setTitleValue(title)
	}, [imageUrl, title])

	const dispatch = useDispatch()
	const navigate = useNavigate()

	const onSave = () => {
		const newContent = sanitizeContent(contentRef.current.innerHTML)

		dispatch(
			savePostAsync(id, {
				imageUrl: imageUrlValue
					? imageUrlValue
					: 'https://github.com/vitalyvitmens/socialpost/blob/main/client/public/assets/image/whereposts.jpg?raw=true',
				title: titleValue ? titleValue : 'Заполните название статьи!',
				content: newContent ? newContent : 'Заполните контекст статьи!',
			})
		).then(({ id }) => navigate(`/post/${id}`))
	}

	const onImageChange = ({ target }) => setImageUrlValue(target.value)
	const onTitleChange = ({ target }) => setTitleValue(target.value)

	return (
		<div className={className}>
			<Input
				id="imageUrlValue"
				name="imageUrlValue"
				value={imageUrlValue}
				placeholder="Изображение..."
				onChange={onImageChange}
			/>
			<Input
				id="titleValue"
				name="titleValue"
				value={titleValue}
				placeholder="Заголовок..."
				onChange={onTitleChange}
			/>
			<SpecialPanel
				id={id}
				publishedAt={<Moment date={publishedAt} format="DD-MM-YYYYг HH:mm" />}
				views={views}
				margin="20px 0"
				editButton={
					<Icon
						id="fa-floppy-o"
						size="21px"
						margin="0 10px 0 0"
						onClick={() => onSave()}
					/>
				}
			/>
			<div
				ref={contentRef}
				contentEditable={true}
				suppressContentEditableWarning={true}
				className="post-text"
			>
				{content}
			</div>
		</div>
	)
}

export const PostForm = styled(PostFormContainer)`
	& img {
		float: left;
		margin: 0 20px 10px 0;
	}

	& .post-text {
		min-height: 80px;
		border: 1px solid #000;
		font-size: 18px;
		white-space: pre-line;
		padding: 10px;
	}
`

PostForm.propTypes = {
	post: PROP_TYPE.POST.isRequired,
}
