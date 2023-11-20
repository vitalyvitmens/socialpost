import { forwardRef } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const InputContainer = forwardRef(({ className, width, height, ...props }, ref) => {
	return <input className={className} {...props} ref={ref} />
})

export const Input = styled(InputContainer)`
	width: ${({ width = '100%' }) => width};
	height: ${({ height = '40px' }) => height};
	margin: 0 0 10px;
	padding: 10px;
	font-size: 18px;
	border: 1px solid #000;
  border-radius: 10px;
  background-color: antiquewhite;
  }
`

Input.propTypes = {
	width: PropTypes.string,
}
