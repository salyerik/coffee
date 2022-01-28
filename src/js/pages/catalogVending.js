import { VENDINGPRODUCTS } from "../constants/listVending.js";
import { ROOT_VENDING_LIST } from "../constants/root.js";
import { products } from "../add-products/addProducts.js";
import rating from '../modules/rating.js'

function coupleFn() {
	let selectWeight = document.querySelectorAll("select[name=\"weight\"]");
	selectWeight.forEach(element => {
		element.addEventListener('change', () => {
			products.selectWeight(event, VENDINGPRODUCTS);
		});
	});

	const btns = document.querySelectorAll('.product__btn')
	btns.forEach(btn => (
		btn.addEventListener('click', () => {
			const id = btn.closest('article').getAttribute('id')
			products.handleSetLocationStorage(btn, id);
		})
	))
	rating()
}

export default function () {
	products.render(VENDINGPRODUCTS, ROOT_VENDING_LIST, 'page-vending');
	coupleFn()

	const select = document.getElementById('sort');
	select.addEventListener('change', () => {
		if (select.value === 'low-high') {
			products.render(VENDINGPRODUCTS, ROOT_VENDING_LIST, 'page-vending', 'sortLowHigh');
			coupleFn();
		} else if (select.value === 'high-low') {
			products.render(VENDINGPRODUCTS, ROOT_VENDING_LIST, 'page-vending', 'sortHighLow');
			coupleFn();
		} else if (select.value === 'rating') {
			products.render(VENDINGPRODUCTS, ROOT_VENDING_LIST, 'page-vending', 'rating');
			coupleFn();
		} else if (select.value === 'review') {
			products.render(VENDINGPRODUCTS, ROOT_VENDING_LIST, 'page-vending', 'review');
			coupleFn();
		}
	});
	console.log('Vending page')
}