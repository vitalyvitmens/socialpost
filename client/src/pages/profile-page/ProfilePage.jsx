import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from '../../redux/selectors'
import { updateUserAsync } from '../../redux/actions'
import { Avatar, Icon } from '../../components'
import styled from 'styled-components'

const CardProfile = styled.div`
	display: flex;
	flex-direction: column;
	width: 500px;
	margin: 160px auto;
	padding: 20px 20px;
	border-width: 1px;
	border-color: rgb(156 163 175);
	border-radius: 16px;
	box-shadow: 0 0 15px gray;
	justify-content: flex-end;
	align-items: center;
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
const ProfilePageContainer = ({ className }) => {
	const dispatch = useDispatch()
	const user = useSelector(selectUser)

	const [firstNameValue, setFirstNameValue] = useState('')
	const [lastNameValue, setLastNameValue] = useState('')
	const [emailValue, setEmailValue] = useState('')
	const [locationValue, setLocationValue] = useState('')
	const [specialityValue, setSpecialityValue] = useState('')
	const [avatarValue, setAvatarValue] = useState('')
	const [loginValue, setLoginValue] = useState('')
	const [editUserData, setEditUserData] = useState(false)

	const onSave = () => {
		dispatch(
			updateUserAsync(user.id, {
				firstName: firstNameValue,
				lastName: lastNameValue,
				email: emailValue,
				location: locationValue,
				speciality: specialityValue,
				avatar: avatarValue,
				login: loginValue,
			})
		).then((newUser) => {
			sessionStorage.removeItem('userData')
			sessionStorage.setItem('userData', JSON.stringify(newUser))
			setFirstNameValue('')
			setLastNameValue('')
			setEmailValue('')
			setLocationValue('')
			setSpecialityValue('')
			setAvatarValue('')
			setLoginValue('')
			setEditUserData(!editUserData)
		})
	}

	const formError =
		!firstNameValue ||
		!lastNameValue ||
		!emailValue ||
		!locationValue ||
		!specialityValue ||
		!avatarValue ||
		!loginValue

	return !editUserData ? (
		<div className={className}>
			<CardProfile>
				<FlexJustifyEnd>
					<Icon
						id="fa-pencil-square-o fa-3x"
						padding="10px 10px 20px 380px"
						onClick={() => setEditUserData(!editUserData)}
					/>
				</FlexJustifyEnd>
				<Avatar width="400px" height="400px">
					{user.avatar}
				</Avatar>
				<div className="text-lastname-firstname">
					{user.lastName} {user.firstName}
				</div>
				<div className="text-email">{user.email}</div>
				<div className="text-location">{user.location}</div>
				<div className="text-speciality">{user.speciality}</div>
			</CardProfile>
		</div>
	) : (
		<div className={className}>
			<CardProfile>
				<FlexJustifyEnd>
					<div className="flex-row">
						<Icon
							id="fa-arrow-left fa-3x"
							onClick={() => setEditUserData(!editUserData)}
						/>
						{formError ? (
							<Icon
								id="fa-check-circle-o fa-3x"
								padding="10px 10px 20px 300px"
							/>
						) : (
							<Icon
								id="fa-check-circle-o fa-3x"
								padding="10px 10px 20px 300px"
								onClick={onSave}
							/>
						)}
					</div>
				</FlexJustifyEnd>
				<Avatar width="400px" height="400px">
					{user.avatar}
				</Avatar>
				<div className="flex-col">
					<label htmlFor="firstName">Имя</label>
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
					{!firstNameValue ? (
						<ErrorField>Поле не должно быть пустым</ErrorField>
					) : null}
					<label htmlFor="lastName">Фамилия</label>
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
					{!lastNameValue ? (
						<ErrorField>Поле не должно быть пустым</ErrorField>
					) : null}
					<label htmlFor="profileEmail">Электронная почта</label>
					<input
						className="border rounded-md py-1 px-2 m-2 border-gray-400 bg-[#e0e9f8]"
						id="profileEmail"
						value={emailValue}
						name="profileEmail"
						type="email"
						placeholder={user.email}
						onChange={(e) => setEmailValue(e.target.value)}
						// {...register('email', {
						// 	onChange: () => setServerError(null),
						// })}
					/>
					{!emailValue ? (
						<ErrorField>
							Почта должна соответствовать шаблону test@example.com
						</ErrorField>
					) : null}
					<label htmlFor="location">
						Населенный пункт в котором проживаете
					</label>
					<input
						id="location"
						value={locationValue}
						name="location"
						type="text"
						placeholder={user.location}
						onChange={(e) => setLocationValue(e.target.value)}
						// {...register('location', {
						// 	onChange: () => setServerError(null),
						// })}
					/>
					{!locationValue ? (
						<ErrorField>Поле не должно быть пустым</ErrorField>
					) : null}
					<label htmlFor="speciality">Профессия</label>
					<input
						id="speciality"
						value={specialityValue}
						name="speciality"
						type="text"
						placeholder={user.speciality}
						onChange={(e) => setSpecialityValue(e.target.value)}
						// {...register('speciality', {
						// 	onChange: () => setServerError(null),
						// })}
					/>
					{!specialityValue ? (
						<ErrorField>Поле не должно быть пустым</ErrorField>
					) : null}
					<label htmlFor="lastName">Интернет ссылка (URL) на фото</label>
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
					{!avatarValue ? (
						<ErrorField>Поле не должно быть пустым</ErrorField>
					) : null}
					<label htmlFor="lastName">Логин</label>
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
					{!loginValue ? (
						<ErrorField>Поле не должно быть пустым</ErrorField>
					) : null}
				</div>
			</CardProfile>
		</div>
	)
}

export const ProfilePage = styled(ProfilePageContainer)`
	& button {
		padding: 0 30px;
	}

	& .text-lastname-firstname {
		display: flex;
		padding-top: 40px;
		font-size: 2rem;
		font-weight: 500;
	}

	& .text-email {
		display: flex;
		padding-bottom: 20px;
		font-size: 1.75rem;
    font-weight: 500;
    font-style: italic;
    color: blue;
	}

	& .text-location {
		display: flex;
		padding-bottom: 20px;
		font-size: 1.75rem;
    font-weight: 500;
    color: red;
	}

	& .text-speciality {
		display: flex;
		padding-bottom: 20px;
		font-size: 1.5rem;
    color: green;
    font-weight: 500;
	}

	& .flex-row {
		display: flex;
	}

	& .flex-col {
		margin: 20px;
		width: 400px;
	}

	& label {
		padding: 0 0 5px 10px;
		font-size: 1.25rem;
		font-weight: 600;
	}

	& input {
		display: flex;
		padding: 4px 8px;
		border-width: 1px;
		border-color: rgb(156 163 175);
		border-radius: 16px;
		box-shadow: 0 0 15px gray;
		align-items: center;
		background-color: #e0e9f8;
		width: 100%;
		height: 40px;
	}
`
