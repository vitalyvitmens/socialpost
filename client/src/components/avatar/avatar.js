import styled from 'styled-components'

const AvatarContainer = ({ className, children, width, height, ...props }) => (
	<img className={className} {...props} src={children} alt={children} />
)

export const Avatar = styled(AvatarContainer)`
	display: flex;
	width: ${({ width = '80px' }) => width};
	height: ${({ height = '80px' }) => height};
	object-fit: cover;
	border-radius: 50%;
	margin-right: 10px;
	padding: 2px;

	&:hover {
		opacity: 0.8;
	}

	&:active {
		opacity: 0.6;
	}
`
