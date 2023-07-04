import rating from '../modules/rating.js';
import { coffeeProductsPage } from '../add-products/addCoffeeProducts.js';

function coupleFn() {
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
	rating();
}

export default function () {
	coffeeProductsPage.render();
	coupleFn();
	const sort = document.getElementById('sort');
	if (sort) {
		sort.addEventListener('change', () => {
			if (sort.value === 'low-high') {
				coffeeProductsPage.render('sortLowHigh');
				coupleFn();
			} else if (sort.value === 'high-low') {
				coffeeProductsPage.render('sortHighLow');
				coupleFn();
			} else if (sort.value === 'rating') {
				coffeeProductsPage.render('rating');
				coupleFn();
			} else if (sort.value === 'review') {
				coffeeProductsPage.render('review');
				coupleFn();
			}
		});
	}
}
