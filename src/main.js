import Lenis from 'lenis';
import './animations';

const checkbox = document.querySelectorAll('.checkbox');
const overlay = document.querySelector('.overlay');
const copyrightDate = document.querySelectorAll('.copyright-date');

copyrightDate.forEach(el => {
	el.textContent = new Date().getFullYear();
});
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
	const formEl = document.querySelectorAll('.form');
	const telEl = document.querySelectorAll('.form input[type="tel"]');
	const optionsEl = document.querySelectorAll('.form__options');
	const labelEl = document.querySelectorAll('.form__label input');
	const minTelLength = 18;

	formEl.forEach(el =>
		addEventListener('submit', e => {
			e.preventDefault();

			if (telEl.value.length != minTelLength) return;

			const formData = new FormData(formEl);
			console.log(...formData);
		})
	);

	telEl.forEach(el => {
		el.addEventListener('focus', e => {
			if (!e.target.value) e.target.value = '+7 ';
		});
		el.addEventListener('input', () => {
			const input = el.value.replace(/\D/g, ''); // Remove non-digit characters
			el.value = formatPhone(input);
		});
	});

	optionsEl.forEach((el, i) => {
		const label = Array.from(labelEl)[i];
		el.addEventListener('click', e => {
			const { target } = e;

			if (!target.closest('.form__option label')) return;

			const val = target.closest('.form__option label').textContent.trim();
			label.value = val;
		});
	});
};

initRegisterForm();

// Initialize Lenis
const lenis = new Lenis();

// Use requestAnimationFrame to continuously update the scroll
function raf(time) {
	lenis.raf(time);
	requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
