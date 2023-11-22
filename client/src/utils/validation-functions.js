export function isFirstName(value) {
	const checkedString = /^([А-Я]{1}[а-яё]{1,23}|[A-Z]{1}[a-z]{1,23})$/g.test(
		value
	)

	return checkedString
		? null
		: 'Неверно указано имя. Допускаются только буквы из них первая должна быть заглавной'
}

export function isLastName(value) {
	const checkedString = /^([А-Я]{1}[а-яё]{1,23}|[A-Z]{1}[a-z]{1,23})$/g.test(
		value
	)

	return checkedString
		? null
		: 'Неверно указана фамилия. Допускаются только буквы из них первая должна быть заглавной'
}

export function isEmail(value) {
	const checkedString =
		/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/g.test(value)

	return checkedString ? null : 'Неверно заполнен email'
}

export function isLocation(value) {
	const checkedString =
		/^(([a-zA-Zа-яА-ЯёЁ]*(\s*)\([a-zA-Zа-яА-ЯёЁ\s]*\))|([a-zA-Zа-яА-ЯёЁ\-0-9]*)|([a-zA-Zа-яА-ЯёЁ]+[\\-|\s]?[a-zA-Zа-яА-ЯёЁ]*[\\-|\s]?[a-zA-Zа-яА-ЯёЁ]*[\\-|\s]?[a-zA-Zа-яА-ЯёЁ]*))$/g.test(
			value
		)

	return checkedString
		? null
		: 'Неверно указан населенный пункт. Допускаются буквы, цифры, без пробелов и символов, за исключением тире'
}

export function isSpeciality(value) {
	const checkedString =
		/^(([a-zA-Zа-яА-ЯёЁ]*(\s*)\([a-zA-Zа-яА-ЯёЁ\s]*\))|([a-zA-Zа-яА-ЯёЁ\-0-9]*)|([a-zA-Zа-яА-ЯёЁ]+[\\-|\s]?[a-zA-Zа-яА-ЯёЁ]*[\\-|\s]?[a-zA-Zа-яА-ЯёЁ]*[\\-|\s]?[a-zA-Zа-яА-ЯёЁ]*))$/g.test(
			value
		)

	return checkedString
		? null
		: 'Неверно указана профессия. Допускаются только буквы, цифры, одиночные тире, пробел или нижнее подчеркивание'
}

export function isImageURL(value) {
	const checkedString =
		/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\\+.~#?&\\/=]*)$$/g.test(
			value
		)

	return checkedString
		? null
		: 'Неверно заполненна интернет ссылка (URL) на Ваше фото. Допустимые форматы jpg, jpeg, png'
}

export function isLogin(value) {
	const checkedString = /^\w+$/g.test(value)

	return checkedString
		? null
		: 'Неверно заполнен логин. Допускаются только буквы цифры и нижнее подчеркивание'
}
