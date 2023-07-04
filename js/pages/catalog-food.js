import { FOOD_PRODUCTS } from '../constants/food.js';
import { ROOT_FOOD_LIST } from '../constants/root.js';
import { products } from '../add-products/addProducts.js';
import rating from '../modules/rating.js';

function coupleFn() {
	let selectWeight = document.querySelectorAll('select[name="weight"]');
	selectWeight.forEach(element => {
		element.addEventListener('change', () => {
			products.selectWeight(event, FOOD_PRODUCTS);
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
	products.render(FOOD_PRODUCTS, ROOT_FOOD_LIST, 'page-food');
	coupleFn();

	const select = document.getElementById('sort');
	select.addEventListener('change', () => {
		if (select.value === 'low-high') {
			products.render(
				FOOD_PRODUCTS,
				ROOT_FOOD_LIST,
				'page-food',
				'sortLowHigh',
			);
			coupleFn();
		} else if (select.value === 'high-low') {
			products.render(
				FOOD_PRODUCTS,
				ROOT_FOOD_LIST,
				'page-food',
				'sortHighLow',
			);
			coupleFn();
		} else if (select.value === 'rating') {
			products.render(FOOD_PRODUCTS, ROOT_FOOD_LIST, 'page-food', 'rating');
			coupleFn();
		} else if (select.value === 'review') {
			products.render(FOOD_PRODUCTS, ROOT_FOOD_LIST, 'page-food', 'review');
			coupleFn();
		}
	});
}
