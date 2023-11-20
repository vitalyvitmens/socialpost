import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from '../../redux/selectors'
import { updateUserAsync } from '../../redux/actions'
import { Avatar, Icon } from '../../components'
import styled from 'styled-components'

const CardProfile = styled.div`
	display: flex;
	flex-direction: column;
	width: 320px;
	margin: 160px auto;
	padding: 16px 16px;
	border-width: 1px;
	border-color: rgb(156 163 175);
	border-radius: 16px;
	box-shadow: 0 0 15px gray;
	justify-content: flex-end;
	align-items: center;
`
const Input = styled.div`
	display: flex;
	padding: 4px 8px;
	border-width: 1px;
	border-color: rgb(156 163 175);
	border-radius: 16px;
	box-shadow: 0 0 15px gray;
	align-items: center;
	background-color: #e0e9f8;
`
const FlexJustifyEnd = styled.div`
	display: flex;
	justify-content: flex-end;
`
const ErrorField = styled.div`
	display: flex;
	padding: 0 12px;
	color: rgb(194 65 12);
	font-size: 12px;
`
const ProfilePageContainer = () => {
	const dispatch = useDispatch()
	const user = useSelector(selectUser)

	const [firstNameValue, setFirstNameValue] = useState('')
	const [lastNameValue, setLastNameValue] = useState('')
	const [emailValue, setEmailValue] = useState('')
	const [avatarValue, setAvatarValue] = useState('')
	const [loginValue, setLoginValue] = useState('')
	const [editUserData, setEditUserData] = useState(false)

	const onSave = () => {
		dispatch(
			updateUserAsync(user.id, {
				firstName: firstNameValue,
				lastName: lastNameValue,
				email: emailValue,
				avatar: avatarValue,
				login: loginValue,
			})
		).then((newUser) => {
			sessionStorage.removeItem('userData')
			sessionStorage.setItem('userData', JSON.stringify(newUser))
			setFirstNameValue('')
			setLastNameValue('')
			setEmailValue('')
			setAvatarValue('')
			setLoginValue('')
			setEditUserData(!editUserData)
		})
	}

	const formError =
		!firstNameValue ||
		!lastNameValue ||
		!emailValue ||
		!avatarValue ||
		!loginValue

	return !editUserData ? (
		<CardProfile>
			<FlexJustifyEnd>
				<Icon
					id="fa-pencil-square-o fa-3x"
					onClick={() => setEditUserData(!editUserData)}
				/>
			</FlexJustifyEnd>
			<Avatar>{user.avatar}</Avatar>
			<div className="text-center">
				{user.lastName} {user.firstName}
			</div>
			<div className="text-center text-lg pb-5 text-green-900">
				{user.email}
			</div>
		</CardProfile>
	) : (
		<CardProfile>
			<FlexJustifyEnd>
				<div className="flex flex-row w-full justify-between">
					<Icon
						id="fa fa-arrow-left fa-3x text-blue-800"
						onClick={() => setEditUserData(!editUserData)}
					/>
					{formError ? (
						<Icon id="fa fa-check-circle-o fa-3x text-gray-400" />
					) : (
						<Icon
							id="fa fa-check-circle-o fa-3x text-green-800r"
							onClick={onSave}
						/>
					)}
				</div>
			</FlexJustifyEnd>
			<Avatar>{user.avatar}</Avatar>
			<div
				className="flex flex-col m-5 w-[260px]"
				// onSubmit={handleSubmit(onSubmit)}
			>
				<label className="text-sm px-2" htmlFor="firstName">
					Имя
				</label>
				<Input>
					<input
						id="firstName"
						value={firstNameValue}
						name="firstName"
						type="text"
						placeholder={user.firstName}
						onChange={(e) => setFirstNameValue(e.target.value)}
						// {...register('firstName', {
						// 	onChange: () => setServerError(null),
						// })}
					/>
				</Input>
				{!firstNameValue ? (
					<ErrorField>Поле не должно быть пустым</ErrorField>
				) : null}
				<label className="text-sm px-2" htmlFor="lastName">
					Фамилия
				</label>
				<Input>
					<input
						id="lastName"
						value={lastNameValue}
						name="lastName"
						type="text"
						placeholder={user.lastName}
						onChange={(e) => setLastNameValue(e.target.value)}
						// {...register('lastName', {
						// 	onChange: () => setServerError(null),
						// })}
					/>
				</Input>
				{!lastNameValue ? (
					<ErrorField>Поле не должно быть пустым</ErrorField>
				) : null}
				<label className="text-sm px-2" htmlFor="registerEmail">
					Электронная почта
				</label>
				<Input>
					<input
						className="border rounded-md py-1 px-2 m-2 border-gray-400 bg-[#e0e9f8]"
						id="registerEmail"
						value={emailValue}
						name="registerEmail"
						type="email"
						placeholder={user.email}
						onChange={(e) => setEmailValue(e.target.value)}
						// {...register('email', {
						// 	onChange: () => setServerError(null),
						// })}
					/>
				</Input>
				{!emailValue ? (
					<ErrorField>
						Почта должна соответствовать шаблону test@example.com
					</ErrorField>
				) : null}
				<label className="text-sm px-2" htmlFor="lastName">
        Интернет ссылка на фото
				</label>
				<Input>
					<input
						id="avatar"
						value={avatarValue}
						name="avatar"
						type="text"
						placeholder={user.avatar}
						onChange={(e) => setAvatarValue(e.target.value)}
						// {...register('lastName', {
						// 	onChange: () => setServerError(null),
						// })}
					/>
				</Input>
				{!avatarValue ? (
					<ErrorField>Поле не должно быть пустым</ErrorField>
				) : null}
				<label className="text-sm px-2" htmlFor="lastName">
					Логин
				</label>
				<Input>
					<input
						id="login"
						value={loginValue}
						name="login"
						type="text"
						placeholder={user.login}
						onChange={(e) => setLoginValue(e.target.value)}
						// {...register('lastName', {
						// 	onChange: () => setServerError(null),
						// })}
					/>
				</Input>
				{!loginValue ? (
					<ErrorField>Поле не должно быть пустым</ErrorField>
				) : null}
			</div>
		</CardProfile>
	)
}

export const ProfilePage = styled(ProfilePageContainer)`
	& button {
		padding: 0 30px;
	}

	& .text-center {
		display: flex;
		padding-top: 8px;
		color: rgb(194 65 12);
		font-size: 42px;
	}
	// text-center
	// text-2xl
`
