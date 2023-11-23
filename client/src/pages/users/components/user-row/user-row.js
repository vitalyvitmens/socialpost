import PropTypes from 'prop-types'
import { useState } from 'react'
import { Avatar, Icon } from '../../../../components'
import { TableRow } from '../table-row/table-row'
import { PROP_TYPE } from '../../../../constants'
import { request } from '../../../../utils/request'
import Moment from 'react-moment'
import styled from 'styled-components'

const UserRowContainer = ({
	className,
	id,
	lastName,
	firstName,
	avatar,
	login,
	location,
	speciality,
	registeredAt,
	roleId: userRoleId,
	roles,
	onUserRemove,
}) => {
	const [initialRoleId, setInitialRoleId] = useState(userRoleId)
	const [selectedRoleId, setSelectedRoleId] = useState(userRoleId)

	const onRoleChange = ({ target }) => {
		setSelectedRoleId(Number(target.value))
	}

	const onRoleSave = (userId, newUserRoleId) => {
		request(`/users/${userId}`, 'PATCH', { roleId: newUserRoleId }).then(() => {
			setInitialRoleId(newUserRoleId)
		})
	}

	const isSaveButtonDisabled = selectedRoleId === initialRoleId

	return (
		<div className={className}>
			<TableRow border={true}>
				<div className="last-name-column">{lastName}</div>
				<div className="first-name-column">{firstName}</div>
				<div className="avatar-column">
					<Avatar>{avatar}</Avatar>
				</div>
				<div className="login-column">{login}</div>
				<div className="location-column">{location}</div>
				<div className="speciality-column">{speciality}</div>
				<div className="registered-at-column">
					{<Moment date={registeredAt} format="DD-MM-YYYYг HH:mm" />}
				</div>
				<div className="role-column">
					<select
						id={id}
						name="select"
						value={selectedRoleId}
						onChange={onRoleChange}
					>
						{roles.map(({ id: roleId, name: roleName }) => (
							<option key={roleId} value={roleId}>
								{roleName}
							</option>
						))}
					</select>
					<Icon
						id="fa-floppy-o"
						margin="0 0 0 10px"
						disabled={isSaveButtonDisabled}
						onClick={() => onRoleSave(id, selectedRoleId)}
					/>
				</div>
			</TableRow>
			<Icon id="fa-trash-o" margin="25px 0 0 10px" onClick={onUserRemove} />
		</div>
	)
}

export const UserRow = styled(UserRowContainer)`
	display: flex;
	margin-top: 10px;

	& select {
		padding: 0 5px;
		font-size: 16px;
		background-color: antiquewhite;
    border-radius: 10px;
	}
`

UserRow.propTypes = {
	id: PropTypes.string.isRequired,
	login: PropTypes.string.isRequired,
	registeredAt: PropTypes.string.isRequired,
	roleId: PROP_TYPE.ROLE_ID.isRequired,
	roles: PropTypes.arrayOf(PROP_TYPE.ROLE).isRequired,
	onUserRemove: PropTypes.func.isRequired,
}
