import './scss/main.scss';

const checkbox = document.querySelectorAll('.checkbox');
const overlay = document.querySelector('.overlay');

overlay.addEventListener('click', () => {
	checkbox.forEach(el => (el.checked = false));
});

document.addEventListener('click', e => {
	const { target } = e;
	if (!target.classList.contains('checkbox') && !target.classList.contains('overlay')) return;
	const checkboxArr = Array.from(checkbox);
	document.body.classList.toggle(
		'overflow-hidden',
		checkboxArr.some(el => el.checked)
	);
});

const formatPhone = input => {
	let formatted = '+7 (';
	if (input.length > 1) formatted += input.substring(1, 4);
	if (input.length >= 5) formatted += ') ' + input.substring(4, 7);
	if (input.length >= 8) formatted += '-' + input.substring(7, 9);
	if (input.length >= 10) formatted += '-' + input.substring(9, 11);
	return formatted;
};
const initRegisterForm = () => {
	const formEl = document.querySelector('.register__form');
	const telEl = document.querySelector('.register__form input[type="tel"]');
	const optionsEl = document.querySelector('.register__options');
	const labelEl = document.querySelector('.register__label input');
	const minTelLength = 18;

	formEl.addEventListener('submit', e => {
		e.preventDefault();

		if (telEl.value.length != minTelLength) return;

		const formData = new FormData(formEl);
		console.log(...formData);
	});
	telEl.addEventListener('focus', e => {
		if (!e.target.value) e.target.value = '+7 ';
	});
	telEl.addEventListener('input', () => {
		const input = telEl.value.replace(/\D/g, ''); // Remove non-digit characters
		telEl.value = formatPhone(input);
	});
	optionsEl.addEventListener('click', e => {
		const { target } = e;

		if (!target.closest('.register__option label')) return;

		const val = target.closest('.register__option label').textContent.trim();
		labelEl.value = val;
	});
};

initRegisterForm();
