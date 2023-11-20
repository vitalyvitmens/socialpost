import { Link } from 'react-router-dom'
import { H2 } from '../h2/h2'
import styled from 'styled-components'
import { PROP_TYPE } from '../../constants'

const Div = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	font-size: 18px;

	& .error {
		background-image: url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif);
		height: 600px;
		width: 800px;
		background-position: center;
	}

	& .to-main {
		margin-top: 20px;
		color: blue;
		font-size: 18px;
		font-weight: 600;
		text-decoration: underline;
	}

	& .to-main:hover {
		opacity: 0.7;
	}
`

export const Error = ({ error }) =>
	error && (
		<>
			<Div>
				<H2>{error}</H2>
				<div className="error"></div>
				<Link className="to-main" to="/">
					НА ГЛАВНУЮ
				</Link>
			</Div>
		</>
	)

Error.propTypes = {
	error: PROP_TYPE.ERROR,
}
