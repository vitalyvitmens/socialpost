import { Icon } from '../icon/icon'
import styled from 'styled-components'

const Div = styled.div`
	font-size: 24px;
	margin-top: 40px;
	text-align: center;
`

export const LoaderSpinner = () => (
	<Div>
		<Icon
			inactive={true}
			id="fa-refresh fa-spin fa-3x fa-fw"
			margin="0 7px 0 0"
			size="24px"
			aria-hidden="true"
		/>
		<span>Loading...</span>
	</Div>
)
