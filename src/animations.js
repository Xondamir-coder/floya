import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const fadeInAnimation = {
	opacity: 0,
	filter: 'blur(20px)',
	duration: 0.7
};

// Define reusable function for staggered animations
const staggeredAnimation = (elements, staggerValue, xDirection, yDirection = 0, scaleValue = 1) => {
	elements.forEach((el, i) => {
		gsap.from(el, {
			...fadeInAnimation,
			stagger: staggerValue,
			x: xDirection ? (i % 2 === 0 ? xDirection : -xDirection) : 0,
			y: yDirection ? (i % 2 === 0 ? yDirection : -yDirection) : 0,
			scale: scaleValue,
			scrollTrigger: {
				trigger: el,
				start: '20% 80%'
			}
		});
	});
};

// Audience items animation
// staggeredAnimation(
// 	Array.from(document.querySelectorAll('.audience__item')).map(el => el.children),
// 	0.3,
// 	50
// );
Array.from(document.querySelectorAll('.audience__item')).forEach(el => {
	gsap.from(el.children, {
		...fadeInAnimation,
		stagger: 0.2,
		x: -50,
		scrollTrigger: {
			trigger: el,
			start: '20% 80%'
		}
	});
});

// Tasks items animation
staggeredAnimation(Array.from(document.querySelectorAll('.tasks__item')), 0, -50, 50);

// Tutorial items animation
gsap.from('.tutorial__item', {
	...fadeInAnimation,
	scale: 0.5,
	scrollTrigger: {
		trigger: '.tutorial__item',
		start: '20% 80%'
	}
});

// Gains items animation
staggeredAnimation(Array.from(document.querySelectorAll('.gains__item')), 0, 100);

// Workflow form and right side animation
const workflowAnimations = [
	{ selector: '.workflow__form', x: -100 },
	{ selector: '.workflow__right', x: 100 }
];

workflowAnimations.forEach(({ selector, x }) => {
	gsap.from(selector, {
		...fadeInAnimation,
		x,
		scrollTrigger: {
			trigger: selector,
			start: '20% bottom'
		}
	});
});

// Telegram content animation
gsap.from('.telegram__content > *', {
	y: -50,
	stagger: 0.25,
	...fadeInAnimation,
	scrollTrigger: {
		trigger: '.telegram__content',
		start: '20% bottom'
	}
});

// Telegram image
gsap.from('.telegram__image', {
	...fadeInAnimation,
	y: 150,
	scrollTrigger: {
		trigger: '.telegram__image',
		start: '20% bottom'
	}
});

// Convenience items animation
staggeredAnimation(Array.from(document.querySelectorAll('.convenience__item')), 0, 0, 0, 0.8);

// Advertisement sections animation
gsap.from('.ad__right > *', {
	y: 50,
	stagger: 0.3,
	...fadeInAnimation,
	scrollTrigger: {
		trigger: '.ad__right',
		start: '20% bottom'
	}
});

gsap.from('.ad__left > *', {
	scale: 0.7,
	stagger: 0.2,
	...fadeInAnimation,
	scrollTrigger: {
		trigger: '.ad__left',
		start: '20% bottom'
	}
});

// Footer elements animation
const footerAnimations = [
	{ selector: '.footer-form', y: 100 },
	{ selector: '.footer__image-container', y: -100 },
	{ selector: '.footer__list', y: 100, trigger: '.footer__middle' }
];

footerAnimations.forEach(({ selector, y, trigger }) => {
	gsap.from(selector, {
		...fadeInAnimation,
		y,
		scrollTrigger: {
			trigger: trigger || selector,
			start: '20% bottom'
		}
	});
});
