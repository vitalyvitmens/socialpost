import { Icon, Input } from '../../../../components'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const SearchContainer = ({ className, searchPhrase, onChange }) => {
	return (
		<div className={className}>
			<Input
				id="searchPhrase"
				name="searchPhrase"
				value={searchPhrase}
				placeholder="Поиск по тексту постов..."
				onChange={onChange}
			/>
			<Icon inactive={true} id="fa-search" size="21px" />
		</div>
	)
}
export const Search = styled(SearchContainer)`
	display: flex;
	position: relative;
	width: 340px;
	height: 40px;
	margin: 40px auto 0;

	& > input {
		padding: 10px 36px 10px 10px;
		font-size: 21px;
		border-radius: 10px;
	}

	& > div {
		position: absolute;
		top: 3px;
		right: 9px;
	}
`

Search.propTypes = {
	searchPhrase: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
}
