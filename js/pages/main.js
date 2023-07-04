import animation from '../modules/animation.js';
import rating from '../modules/rating.js';
import parallax from '../modules/parallax.js';
import { coffeeProductsPage } from '../add-products/addCoffeeProducts.js';

export default function () {
	new Swiper('.block1', {
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
		spaceBetween: 130,
		loop: true,
		slidesPerView: '1',
		autoplay: {
			delay: 3000,
		},
	});

	new Swiper('.block3__slider', {
		loop: true,
		navigation: {
			prevEl: '.block3__prev',
			nextEl: '.block3__next',
		},
		autoplay: {
			delay: 2500,
		},
		spaceBetween: 30,
		breakpoints: {
			320: {
				slidesPerView: 1,
			},
			900: {
				slidesPerView: 2,
			},
			1440: {
				slidesPerView: 3,
			},
		},
	});

	new Swiper('.block7__slider', {
		navigation: {
			nextEl: '.block7__arrow',
		},
		autoplay: {
			delay: 2000,
		},
		loop: true,
		spaceBetween: 20,
		breakpoints: {
			320: {
				slidesPerView: 1.5,
			},
			768: {
				slidesPerView: 2.5,
			},
			1440: {
				slidesPerView: 3.5,
			},
			1920: {
				slidesPerView: 4.5,
			},
			2560: {
				slidesPerView: 6.5,
			},
		},
	});

	coffeeProductsPage.render();
	rating();
	parallax();
	animation();

	const btns = document.querySelectorAll('.product__btn');
	btns.forEach(btn =>
		btn.addEventListener('click', () => {
			const id = btn.closest('article').getAttribute('id');
			coffeeProductsPage.handleSetLocationStorage(btn, id);
		}),
	);

	const selectWeights = document.querySelectorAll('[name=weight]');
	selectWeights.forEach(select =>
		select.addEventListener('change', () => {
			coffeeProductsPage.selectWeight(event);
		}),
	);
}
