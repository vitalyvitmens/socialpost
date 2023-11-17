import { Link } from 'react-router-dom'
import { Icon } from '../../../../components'
import styled from 'styled-components'

const LargeText = styled.div`
	color: blue;
	font-size: 48px;
	font-weight: 600;
	line-height: 42px;
	padding: 0 0 0 10px;
`

const LogoContainer = ({ className }) => (
	<Link className={className} to="/">
		<Icon id="fa fa-book" size="90px" margin="-10px 10px 0 0" />
		<div>
			<LargeText>Social Post</LargeText>
		</div>
	</Link>
)

export const Logo = styled(LogoContainer)`
	display: flex;
	width: 20%;

	&:hover {
		opacity: 0.8;
	}

	&:active {
		opacity: 0.6;
	}
`
