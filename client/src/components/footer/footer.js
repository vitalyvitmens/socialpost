import { useEffect, useState } from 'react'
import styled from 'styled-components'

const FooterContainer = ({ className }) => {
	const [city, setCity] = useState('')
	const [temperature, setTemperature] = useState('')
	const [weather, setWeather] = useState('')

	useEffect(() => {
		fetch(
			'https://api.openweathermap.org/data/2.5/weather?q=Minsk&units=metric&lang=ru&appid=4707c215225f3783a2e45a56dd73e1b2'
		)
			.then((res) => res.json())
			.then(({ name, main, weather }) => {
				setCity(name)
				setTemperature(Math.round(main.temp))
				setWeather(weather[0].description)
			})
	}, [])

	return (
		<div className={className}>
			<div>
				<div>Новостной Блог</div>
				<div>
					©{' '}
					{new Date().toLocaleString('ru', {
						year: 'numeric',
					})}{' '}
					vitalyvitmens. All rights reserved.
				</div>
			</div>
			<div>
				<div>
					{city}{' '}
					{new Date().toLocaleString('ru', {
						day: 'numeric',
						month: 'long',
						year: 'numeric',
					})}
				</div>
				<div>
					{temperature}
					{'°C,'} {weather}
				</div>
			</div>
		</div>
	)
}

export const Footer = styled(FooterContainer)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	bottom: 0;
	width: 1000px;
	height: 120px;
	padding: 20px 40px;
	font-weight: bold;
	background-color: bisque;
	box-shadow: 0 -7px 10px #333;
`
