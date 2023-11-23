import PropTypes from 'prop-types'
import styled from 'styled-components'

const TableRowContainer = ({ className, children }) => (
	<div className={className}>{children}</div>
)

export const TableRow = styled(TableRowContainer)`
	display: flex;
	align-items: center;
	border: ${({ border }) => (border ? '1px solid #000' : 'none')};
  border-radius: 10px;
	padding: 0 34px 0 10px;

	& > div {
		display: flex;
	}

	& .last-name-column {
		width: 120px;
	}

	& .first-name-column {
		width: 120px;
	}

	& .avatar-column {
		width: 120px;
	}

	& .login-column {
		width: 80px;
	}

	& .location-column {
		width: 140px;
	}

	& .speciality-column {
		width: 180px;
	}

	& .registered-at-column {
		width: 180px;
	}

	& .role-column {
		width: 158px;
	}
`

TableRow.propTypes = {
	children: PropTypes.node.isRequired,
}
