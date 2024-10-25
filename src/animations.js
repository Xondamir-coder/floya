import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

Array.from(document.querySelectorAll('.audience__item')).forEach((el, i) => {
	gsap.from(el.children, {
		stagger: 0.3,
		opacity: 0,
		filter: 'blur(20px)',
		x: i % 2 === 0 ? 50 : -50,
		scrollTrigger: {
			trigger: el,
			start: '20% 80%',
			end: 'bottom 20%'
		}
	});
});

Array.from(document.querySelectorAll('.tasks__item')).forEach((el, i) => {
	gsap.from(el, {
		opacity: 0,
		filter: 'blur(20px)',
		x: i % 2 === 0 ? -50 : 50,
		y: i % 2 === 0 ? -50 : 50,
		duration: 0.7,
		scrollTrigger: {
			trigger: el,
			start: '20% 80%'
		}
	});
});

gsap.from('.tutorial__item', {
	opacity: 0,
	filter: 'blur(20px)',
	stagger: 0.2,
	scale: 0.5,
	duration: 0.6,
	scrollTrigger: {
		trigger: '.tutorial__item',
		start: '20% 80%'
	}
});

Array.from(document.querySelectorAll('.gains__item')).forEach((el, i) => {
	gsap.from(el, {
		opacity: 0,
		filter: 'blur(20px)',
		x: i % 2 === 0 ? -100 : 100,
		duration: 0.7,
		scrollTrigger: {
			trigger: el,
			start: 'top 80%'
		}
	});
});

gsap.from('.workflow__form', {
	x: -100,
	opacity: 0,
	filter: 'blur(20px)',
	duration: 0.7,
	scrollTrigger: {
		trigger: '.workflow__form',
		start: '20% bottom'
	}
});

gsap.from('.workflow__right', {
	x: 100,
	opacity: 0,
	filter: 'blur(20px)',
	duration: 0.7,
	scrollTrigger: {
		trigger: '.workflow__right',
		start: '20% bottom'
	}
});

gsap.from('.telegram__content>*', {
	y: -50,
	stagger: 0.25,
	opacity: 0,
	filter: 'blur(20px)',
	duration: 0.7,
	scrollTrigger: {
		trigger: '.telegram__content',
		start: '20% bottom'
	}
});

Array.from(document.querySelectorAll('.convenience__item')).forEach((el, i) => {
	gsap.from(el, {
		opacity: 0,
		filter: 'blur(20px)',
		scale: 0.8,
		duration: 0.7,
		scrollTrigger: {
			trigger: el,
			start: 'top 80%'
		}
	});
});

gsap.from('.ad__right>*', {
	opacity: 0,
	stagger: 0.3,
	filter: 'blur(20px)',
	duration: 0.7,
	y: 50,
	scrollTrigger: {
		trigger: '.ad__right',
		start: '20% bottom'
	}
});

gsap.from('.ad__left>*', {
	opacity: 0,
	stagger: 0.2,
	filter: 'blur(20px)',
	duration: 0.7,
	scale: 0.7,
	scrollTrigger: {
		trigger: '.ad__right',
		start: '20% bottom'
	}
});

gsap.from('.footer-form', {
	opacity: 0,
	filter: 'blur(20px)',
	duration: 0.7,
	y: 100,
	scrollTrigger: {
		trigger: '.footer-form',
		start: '20% bottom'
	}
});

gsap.from('.footer__image-container', {
	opacity: 0,
	filter: 'blur(20px)',
	duration: 0.7,
	y: -100,
	scrollTrigger: {
		trigger: '.footer__image-container',
		start: '20% bottom'
	}
});

gsap.from('.footer__list', {
	opacity: 0,
	filter: 'blur(20px)',
	duration: 0.7,
	y: 100,
	scrollTrigger: {
		trigger: '.footer__middle',
		start: '20% bottom'
	}
});
