import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Icon, Avatar } from '../../../../components'
import styled from 'styled-components'
import { ROLE } from '../../../../constants'
import {
	selectUserRole,
	selectLastName,
	selectFirstName,
} from '../../../../redux/selectors'
import { logout } from '../../../../redux/actions'
import { checkAccess } from '../../../../utils'

const RightAligned = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: start;
`

const UserName = styled.div`
	font-size: 18px;
	font-weight: bold;
`

const ControlPanelContainer = ({ className }) => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const roleId = useSelector(selectUserRole)
	const lastName = useSelector(selectLastName)
	const firstName = useSelector(selectFirstName)

	const onLogout = () => {
		dispatch(logout())
		sessionStorage.removeItem('userData')
	}

	const isAdmin = checkAccess([ROLE.ADMIN], roleId)

	return (
		<div className={className}>
			<RightAligned>
				{roleId === ROLE.GUEST ? (
					<Button>
						<Link to="/login">Войти</Link>
					</Button>
				) : (
					<>
						<Avatar />
						<UserName>
							{lastName} {firstName}
						</UserName>
						<Icon id="fa-sign-out" margin="0 0 0 10px" onClick={onLogout} />
					</>
				)}
			</RightAligned>
			<RightAligned>
				<Icon
					id="fa-backward"
					margin="-30px 0 0 0"
					onClick={() => navigate(-1)}
				/>
				<Link to="/post">
					<Icon id="fa-file-text-o" margin="-30px 0 30px 16px" />
				</Link>
				{isAdmin && (
					<>
						<Link to="/users">
							<Icon id="fa-users" margin="-30px 0 0 16px" />
						</Link>
					</>
				)}
			</RightAligned>
			<div></div>
		</div>
	)
}

export const ControlPanel = styled(ControlPanelContainer)`
	& button {
		padding: 0 30px;
	}
`
