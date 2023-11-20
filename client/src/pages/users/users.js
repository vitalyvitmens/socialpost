import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { PrivateContent, H2, Icon } from '../../components'
import { UserRow, TableRow } from './components'
import { selectUserRole } from '../../redux/selectors'
import { checkAccess } from '../../utils'
import { ROLE } from '../../constants'
import { request } from '../../utils/request'
import styled from 'styled-components'

const UsersContainer = ({ className }) => {
	const [users, setUsers] = useState([])
	const [roles, setRoles] = useState([])
	const [errorMessage, setErrorMessage] = useState(null)
	const [shouldUpdateUserList, setShouldUpdateUserList] = useState(false)
	const userRole = useSelector(selectUserRole)

	useEffect(() => {
		if (!checkAccess([ROLE.ADMIN], userRole)) {
			return
		}

		Promise.all([request('/users'), request('/users/roles')]).then(
			([usersRes, rolesRes]) => {
				if (usersRes.error || rolesRes.error) {
					setErrorMessage(usersRes.error || rolesRes.error)
					return
				}
				setUsers(usersRes.data)
				setRoles(rolesRes.data)
			}
		)
	}, [shouldUpdateUserList, userRole])

	const onUserRemove = (userId) => {
		if (!checkAccess([ROLE.ADMIN], userRole)) {
			return
		}

		request(`/users/${userId}`, 'DELETE').then(() => {
			setShouldUpdateUserList(!shouldUpdateUserList)
		})
	}

	!users && (
		<div className="no-posts-found">
			<Icon
				inactive={true}
				id="fa fa-refresh fa-spin fa-3x fa-fw"
				margin="0 7px 0 0"
				size="24px"
				aria-hidden="true"
			/>
			<span>Loading...</span>
		</div>
	)

	return (
		<PrivateContent access={[ROLE.ADMIN]} serverError={errorMessage}>
			<div className={className}>
				<H2>Пользователи</H2>
				<div>
					<TableRow>
						<div className="last-name-column">Фамилия</div>
						<div className="first-name-column">Имя</div>
						<div className="avatar-column">Аватар</div>
						<div className="login-column">Логин</div>
						<div className="registered-at-column">Дата регистрации</div>
						<div className="role-column">Роль</div>
					</TableRow>
					{users.map(
						({
							id,
							lastName,
							firstName,
							avatar,
							login,
							registeredAt,
							roleId,
						}) => (
							<UserRow
								key={id}
								id={id}
								lastName={lastName}
								firstName={firstName}
								avatar={avatar}
								login={login}
								registeredAt={registeredAt}
								roleId={roleId}
								roles={roles.filter(({ id: roleId }) => roleId !== ROLE.GUEST)}
								onUserRemove={() => onUserRemove(id)}
							/>
						)
					)}
				</div>
			</div>
		</PrivateContent>
	)
}

export const Users = styled(UsersContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 570px;
	margin: 0 auto;
	font-size: 18px;
`
