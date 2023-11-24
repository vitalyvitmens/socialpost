import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
	CLOSE_MODAL,
	openModal,
	removePostAsync,
} from '../../../../redux/actions'
import { selectUser } from '../../../../redux/selectors'
import { Icon } from '../../../../components'
import { checkAccess } from '../../../../utils'
import { ROLE } from '../../../../constants'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const SpecialPanelContainer = ({
	className,
	id,
	publishedAt,
	editButton,
	views,
	author,
}) => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const authUser = useSelector(selectUser)
	const userRole = authUser.roleId

	const onPostRemove = (id) => {
		dispatch(
			openModal({
				text: 'Удалить данный пост?',
				onConfirm: () => {
					dispatch(removePostAsync(id)).then(() => {
						navigate('/main')
						window.location.reload()
					})
					dispatch(CLOSE_MODAL)
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			})
		)
	}

	const isAdmin = checkAccess([ROLE.ADMIN], userRole)
	const isModerator = checkAccess([ROLE.MODERATOR], userRole)
	const authorPost = author ? author : author = authUser.id

	return (
		<div className={className}>
			<div className="published-at">
				{publishedAt && (
					<Icon
						inactive={true}
						id="fa-calendar-o"
						margin="0 7px 0 0"
						size="18px"
					/>
				)}
				{publishedAt}
				<div className="views-count">
					<Icon
						inactive={true}
						id="fa fa-eye"
						margin="0 7px 0 15px"
						size="18px"
					/>
					{views}
				</div>
			</div>

			{(isAdmin || isModerator || authorPost) && (
				<div className="buttons">
					{editButton}
					{publishedAt && (
						<Icon
							id="fa-trash-o"
							size="21px"
							margin="0 0 0 7px"
							onClick={() => onPostRemove(id)}
						/>
					)}
				</div>
			)}
		</div>
	)
}

export const SpecialPanel = styled(SpecialPanelContainer)`
	display: flex;
	justify-content: space-between;
	margin: ${({ margin }) => margin};

	& .published-at {
		display: flex;
		font-size: 18px;
	}

	& .views-count {
		display: flex;
	}

	& .buttons {
		display: flex;
	}

	& i {
		position: relative;
		top: -1px;
	}
`

SpecialPanel.propTypes = {
	id: PropTypes.string.isRequired,
	publishedAt: PropTypes.object.isRequired,
	editButton: PropTypes.node.isRequired,
	views: PropTypes.number.isRequired,
}
