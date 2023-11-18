import styled from 'styled-components'

const AvatarContainer = ({ className, children, ...props }) => (
	<img className={className} {...props} src={children} alt={children} />
)

export const Avatar = styled(AvatarContainer)`
	display: flex;
	width: 80px;
	height: 80px;
	object-fit: cover;
	border-radius: 50%;
	margin-right: 10px;
	padding: 2px;

	&:hover {
		opacity: 0.8;
		cursor: pointer;
	}

	&:active {
		opacity: 0.6;
	}
`
