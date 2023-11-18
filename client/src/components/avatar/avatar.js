import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { selectUserAvatar } from '../../redux/selectors'
import { useNavigate } from 'react-router-dom'

const AvatarContainer = ({ className }) => {
	const navigate = useNavigate()
	const avatar = useSelector(selectUserAvatar)

	return (
		<img
			className={className}
			src={avatar}
			alt={avatar}
			onClick={() => navigate('/profile')}
		/>
	)
}

export const Avatar = styled(AvatarContainer)`
	display: flex;
	width: 80px;
	height: 80px;
  object-fit: cover;
	border-radius: 50%;
	margin-right: 10px;

	&:hover {
		opacity: 0.8;
	}

	&:active {
		opacity: 0.6;
	}
`
