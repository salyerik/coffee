import { VENDING_PRODUCTS } from '../constants/vending.js';
import { ROOT_VENDING_LIST } from '../constants/root.js';
import { products } from '../add-products/addProducts.js';
import rating from '../modules/rating.js';

function coupleFn() {
	let selectWeight = document.querySelectorAll('select[name="weight"]');
	selectWeight.forEach(element => {
		element.addEventListener('change', () => {
			products.selectWeight(event, VENDING_PRODUCTS);
		});
	});

	const btns = document.querySelectorAll('.product__btn');
	btns.forEach(btn =>
		btn.addEventListener('click', () => {
			const id = btn.closest('article').getAttribute('id');
			products.handleSetLocationStorage(btn, id);
		}),
	);
	rating();
}

export default function () {
	products.render(VENDING_PRODUCTS, ROOT_VENDING_LIST, 'page-vending');
	coupleFn();

	const select = document.getElementById('sort');
	select.addEventListener('change', () => {
		if (select.value === 'low-high') {
			products.render(
				VENDING_PRODUCTS,
				ROOT_VENDING_LIST,
				'page-vending',
				'sortLowHigh',
			);
			coupleFn();
		} else if (select.value === 'high-low') {
			products.render(
				VENDING_PRODUCTS,
				ROOT_VENDING_LIST,
				'page-vending',
				'sortHighLow',
			);
			coupleFn();
		} else if (select.value === 'rating') {
			products.render(
				VENDING_PRODUCTS,
				ROOT_VENDING_LIST,
				'page-vending',
				'rating',
			);
			coupleFn();
		} else if (select.value === 'review') {
			products.render(
				VENDING_PRODUCTS,
				ROOT_VENDING_LIST,
				'page-vending',
				'review',
			);
			coupleFn();
		}
	});
}
