import { ControlPanel, Logo } from './components'
import styled from 'styled-components'

// const Discription = styled.div`
// 	font-style: italic;
// `

const HeaderContainer = ({ className }) => (
	<header className={className}>
		<Logo />
		{/* <Discription>
			Ежедневно интересные новости
			<br />
			Технологические прорывы
			<br />
			Будь в курсе основных трендов
		</Discription> */}
		<ControlPanel />
	</header>
)

export const Header = styled(HeaderContainer)`
	display: flex;
	justify-content: space-between;
	position: fixed;
	top: 0;
	text-align: center;
	width: 1000px;
	height: 120px;
	font-size: 21px;
	letter-spacing: 0.015em;
	color: #211f20;
	font-family: Georgia, serif;
	padding: 20px 40px;
	background-color: bisque;
	box-shadow: 0 7px 10px #333;
	z-index: 10;
`
