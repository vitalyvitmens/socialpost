import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { AuthFormError, Button, H2, Input } from '../../components'
import { useResetForm } from '../../hooks'
import { request } from '../../utils/request'
import { setUser } from '../../redux/actions'
import { selectUserRole } from '../../redux/selectors'
import { ROLE } from '../../constants'
import styled from 'styled-components'

const regFormSchema = yup.object().shape({
	firstName: yup
		.string()
		.required('Укажите своё имя')
		.matches(
			/^([А-Я]{1}[а-яё]{1,23}|[A-Z]{1}[a-z]{1,23})$/,
			'Неверно указано имя. Допускаются только буквы'
		)
		.min(2, 'Неверно указано имя. Минимум 2 символа')
		.max(15, 'Неверно указано имя. Максимум 15 символов'),
	lastName: yup
		.string()
		.required('Укажите свою фамилию')
		.matches(
			/^([А-Я]{1}[а-яё]{1,23}|[A-Z]{1}[a-z]{1,23})$/,
			'Неверно указана фамилия. Допускаются только буквы'
		)
		.min(2, 'Неверно указана фамилия. Минимум 2 символа')
		.max(15, 'Неверно указана фамилия. Максимум 15 символов'),
	email: yup
		.string()
		.required('Заполните email')
		.matches(
			/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/,
			'Неверно заполнен email.'
		)
		.min(5, 'Неверно заполнен email. Минимум 5 символа')
		.max(30, 'Неверно заполнен email. Максимум 30 символов'),
	avatar: yup
		.string()
		.required('Укажите ссылку на Ваше фото')
		.matches(
			/[A-Fa-f0-9]/,
			'Неверно заполненна интернет ссылка на Ваше фото. Допусктимые форматы jpg, jpeg, png'
		)
		.min(3, 'Неверно заполненна интернет ссылка на Ваше фото. Минимум 3 символа')
		.max(500, 'Неверно заполненна интернет ссылка на Ваше фото. Максимум 500 символов'),
	login: yup
		.string()
		.required('Заполните логин')
		.matches(
			/^\w+$/,
			'Неверно заполнен логин. Допускаются только буквы и цифры'
		)
		.min(3, 'Неверно заполнен логин. Минимум 3 символа')
		.max(15, 'Неверно заполнен логин. Максимум 15 символов'),
	password: yup
		.string()
		.required('Заполните пароль')
		.matches(
			/^[\w#%]+$/,
			'Неверно заполнен пароль. Допускаются латинские буквы, цифры и знаки # %'
		)
		.min(6, 'Неверно заполнен пароль. Минимум 6 символов')
		.max(30, 'Неверно заполнен пароль. Максимум 30 символов'),
	passcheck: yup
		.string()
		.required('Заполните повтор пароля')
		.oneOf([yup.ref('password'), null], 'Повтор пароля не совпадает'),
})

const StyledLink = styled(Link)`
	text-align: center;
	text-decoration: underline;
	margin: 20px 0;
	font-size: 18px;
`

const RegistrationContainer = ({ className }) => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			firstName: '',
			lastName: '',
			email: '',
			avatar: '',
			login: '',
			password: '',
			passcheck: '',
		},
		resolver: yupResolver(regFormSchema),
	})

	const [serverError, setServerError] = useState(null)

	const dispatch = useDispatch()

	const roleId = useSelector(selectUserRole)

	useResetForm(reset)

	const onSubmit = ({
		firstName,
		lastName,
		email,
		avatar,
		login,
		password,
	}) => {
		request('/register', 'POST', {
			firstName,
			lastName,
			email,
			avatar,
			login,
			password,
		}).then(({ error, user }) => {
			if (error) {
				setServerError(`Ошибка запроса: ${error}`)
				return
			}

			dispatch(setUser(user))
			sessionStorage.setItem('userData', JSON.stringify(user))
		})
	}

	const formError =
		errors?.firstName?.message ||
		errors?.lastName?.message ||
		errors?.email?.message ||
		errors?.avatar?.message ||
		errors?.login?.message ||
		errors?.password?.message ||
		errors?.passcheck?.message
	const errorMessage = formError || serverError

	if (roleId !== ROLE.GUEST) {
		return <Navigate to="/main" />
	}

	return (
		<div className={className}>
			<H2>Регистрация</H2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Input
					type="text"
					placeholder="Имя..."
					{...register('firstName', {
						onChange: () => setServerError(null),
					})}
				/>
				<Input
					type="text"
					placeholder="Фамилия..."
					{...register('lastName', {
						onChange: () => setServerError(null),
					})}
				/>
				<Input
					type="email"
					placeholder="Электронная почта..."
					{...register('email', {
						onChange: () => setServerError(null),
					})}
				/>
				<Input
					type="text"
					placeholder="Интернет ссылка на фото..."
					{...register('avatar', {
						onChange: () => setServerError(null),
					})}
				/>
				<Input
					type="text"
					placeholder="Логин..."
					{...register('login', {
						onChange: () => setServerError(null),
					})}
				/>
				<Input
					type="password"
					placeholder="Пароль..."
					{...register('password', {
						onChange: () => setServerError(null),
					})}
				/>
				<Input
					type="password"
					placeholder="Проверка пароля..."
					{...register('passcheck', {
						onChange: () => setServerError(null),
					})}
				/>
				<Button type="submit" disabled={!!formError}>
					Зарегистрироваться
				</Button>
				{errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}
        <StyledLink to="/">Авторизация</StyledLink>

			</form>
		</div>
	)
}

export const Registration = styled(RegistrationContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;

	& > form {
		display: flex;
		flex-direction: column;
		width: 260px;
	}
`
