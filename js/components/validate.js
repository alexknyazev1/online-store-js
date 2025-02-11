export function initValidate() {
	const formEl = document.querySelector('.questions__form');
	const validator = new JustValidate(formEl);

	validator
		.addField('#name', [
			{
				rule: 'required',
				errorMessage: 'Пожалуйста, укажите ваше имя',
			},
			{
				rule: 'minLength',
				value: 3,
				errorMessage: 'Имя должно содержать минимум 3 символа',
			},
			{
				rule: 'maxLength',
				value: 20,
				errorMessage: 'Имя не может превышать 20 символов',
			},
		])
		.addField('#email', [
			{
				rule: 'required',
				errorMessage: 'Пожалуйста, укажите вашу почту',
			},
			{
				rule: 'email',
				errorMessage: 'Пожалуйста, введите корректный email',
			},
		])
		.addField('#agree', [
			{
				rule: 'required',
				errorMessage: 'Вы должны согласиться с политикой конфиденциальности',
			},
		]);

	const sendMail = (formEl) => {
		fetch(formEl.action, {
			method: 'POST',
			body: new FormData(formEl),
		}).then((response) => {
			if (response.ok) {
				showModal('Благодарим за обращение!');
			} else {
				throw new Error('Ошибка при отправке формы');
			}
		}).catch(() => {
			showModal('Не удалось отправить сообщение');
		});
	};


	formEl.addEventListener('submit', (e) => {
		e.preventDefault();
		if (validator.isValid) {
			sendMail(formEl);
			formEl.reset();
		}
	});

	function showModal(title) {
		const modal = document.createElement('div');
		modal.classList.add('message');
		modal.innerHTML = `
			<div class="message__content">
				<button type="button" class="message__close">&times;</button>
				<h2>${title}</h2>
			</div>`;

		document.body.append(modal);

		modal.querySelector('.message__close').addEventListener('click', () => {
			modal.remove();
		});

		modal.addEventListener('click', (e) => {
			if (e.target === modal) {
				modal.remove();
			}
		});
	}
}
