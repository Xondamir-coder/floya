import Lenis from 'lenis';
import './animations';

// Initialize Lenis
const lenis = new Lenis();

// Use requestAnimationFrame to continuously update the scroll
function raf(time) {
	lenis.raf(time);
	requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

const checkboxes = document.querySelectorAll('.checkbox');
const menuCheckbox = document.querySelector('#menu-checkbox');
const registerCheckbox = document.querySelector('#register-checkbox');
const overlay = document.querySelector('.overlay');
const copyrightDate = document.querySelectorAll('.copyright-date');

// Calculator state
const calculatorState = {
	input: 0,
	output: 0,
	commisions: []
};

copyrightDate.forEach(el => {
	el.textContent = new Date().getFullYear();
});
overlay.addEventListener('click', () => {
	checkboxes.forEach(el => (el.checked = false));
});

document.addEventListener('click', e => {
	const { target } = e;
	// For modals
	if (target.classList.contains('checkbox') || target.classList.contains('overlay')) {
		const checkboxArr = Array.from(checkboxes);
		checkboxArr.some(el => el.checked) ? lenis.stop() : lenis.start();
	}

	// For menu links
	if (target.closest('.menu__item a')) {
		const href = target.closest('.menu__item a').getAttribute('href');
		if (href.includes('#')) {
			e.preventDefault();
			lenis.start();
			menuCheckbox.checked = false;
			lenis.scrollTo(href, {
				offset: window.innerWidth > 768 ? -150 : -85
			});
		}
	}

	// Toggling menu modal
	if (target.closest('[data-register-menu]')) {
		registerCheckbox.checked = !registerCheckbox.checked;
	}

	if (target.closest('button.form__clear')) {
		const clearBtn = target.closest('button.form__clear');
		clearBtn.previousElementSibling.value = '';
	}
});

const formatPhone = input => {
	// Remove all non-digit characters for formatting
	let cleaned = input.replace(/\D/g, '');

	// If the user deletes everything, return an empty string
	if (cleaned.length === 0) {
		return '';
	}

	// Add +7 if there are any digits, but let user delete it
	let formatted = cleaned.startsWith('7') ? '+7 ' : '';

	// Format according to the pattern +7 (###) ###-##-##
	if (cleaned.length > 1) {
		formatted += '(' + cleaned.substring(1, 4);
	}
	if (cleaned.length >= 5) {
		formatted += ') ' + cleaned.substring(4, 7);
	}
	if (cleaned.length >= 8) {
		formatted += '-' + cleaned.substring(7, 9);
	}
	if (cleaned.length >= 10) {
		formatted += '-' + cleaned.substring(9, 11);
	}

	return formatted;
};

const initRegisterForm = () => {
	const formEl = document.querySelectorAll('.form__form');
	const telEl = document.querySelectorAll('.form input[type="tel"]');
	const optionsEl = document.querySelectorAll('.form__options');
	const labelEl = document.querySelectorAll('.form__label input');
	const minTelLength = 18;

	formEl.forEach(el =>
		el.addEventListener('submit', e => {
			e.preventDefault();

			telEl.forEach(el => {
				if (el.value.length != minTelLength) {
					return;
				}
			});

			const formData = new FormData(el);

			// console.log(calculatorState); you might need it after calculating commisions
			console.log(...formData);
		})
	);

	telEl.forEach(el => {
		el.addEventListener('focus', e => {
			if (el.value.replace(/\D/g, '').length === 0) {
				el.value = '+7 ';
			}
		});
		el.addEventListener('input', () => {
			const cursorPosition = el.selectionStart; // Save cursor position
			const prevLength = el.value.length; // Previous input length

			el.value = formatPhone(el.value);

			const newLength = el.value.length;
			// Adjust cursor position to maintain user experience
			el.selectionStart = el.selectionEnd = cursorPosition + (newLength - prevLength);
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
const initCalculator = () => {
	const input = document.querySelector('#workflow-input');
	const output = document.querySelector('#workflow-output');
	const outputs = document.querySelectorAll('.workflow__thing output');
	const checkbox = document.querySelector('#workflow-checkbox');
	const tenPercentOut = Array.from(outputs).find(out => out.dataset.percent == '10');
	const form = document.querySelector('.workflow__form');

	const updateVals = () => {
		const inputVal = Number(input.value);

		// Changing some styles
		inputVal ? output.classList.add('show') : output.classList.remove('show');

		// Calculating commisions
		// First item in array for 10/5% second item for 2%
		calculatorState.commisions = [];
		outputs.forEach(out => {
			const percent = Number(out.dataset.percent);
			const percentVal = Math.round(percent * 0.01 * inputVal);
			out.textContent = percentVal;
			calculatorState.commisions.push(percentVal);
		});
		const outputVal = inputVal - calculatorState.commisions.reduce((a, b) => a + b);
		output.textContent = outputVal;

		// Updating calculator state
		calculatorState.input = inputVal;
		calculatorState.output = outputVal;
	};
	const handleCheckbox = () => {
		const checked = checkbox.checked;
		const newPercent = checked ? '5' : '10';
		tenPercentOut.dataset.percent = newPercent;
		tenPercentOut.nextElementSibling.textContent = newPercent;
		updateVals();
	};

	form.addEventListener('submit', e => {
		e.preventDefault();
		registerCheckbox.checked = true;
	});
	checkbox.addEventListener('change', handleCheckbox);
	input.addEventListener('input', updateVals);
};

initRegisterForm();
initCalculator();
