import PropTypes from 'prop-types'
import styled from 'styled-components'

const ButtonContainer = ({
	children,
	className,
	width,
	height,
	margin,
	...props
}) => {
	return (
		<button className={className} {...props}>
			{children}
		</button>
	)
}

export const Button = styled(ButtonContainer)`
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 18px;
	width: ${({ width = '100%' }) => width};
	height: ${({ height = '32px' }) => height};
	border: 1px solid #000;
	border-radius: 7px;
	box-shadow: -3px 5px 5px #333;
	background-color: bisque;
	margin: ${({ margin = '0 0 50px 0' }) => margin};

	&:hover {
		opacity: 0.8;
		cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
	}

	&:active {
		opacity: 0.6;
		box-shadow: none;
		cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
	}
`

Button.propTypes = {
	children: PropTypes.node.isRequired,
	width: PropTypes.string,
}
