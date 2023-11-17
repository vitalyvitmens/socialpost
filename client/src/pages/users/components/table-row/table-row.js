import PropTypes from 'prop-types'
import styled from 'styled-components'

const TableRowContainer = ({ className, children }) => (
	<div className={className}>{children}</div>
)

export const TableRow = styled(TableRowContainer)`
	display: flex;
	align-items: center;
	border: ${({ border }) => (border ? '1px solid #000' : 'none')};
	padding: 0 34px 0 10px;

	& > div {
		display: flex;
	}

	& .login-column {
		width: 172px;
	}

	& .registered-at-column {
		width: 213px;
	}

	& .role-column {
		width: 158px;
	}
`

TableRow.propTypes = {
	children: PropTypes.node.isRequired,
}
