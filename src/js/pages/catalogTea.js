import { TEAPRODUCTS } from "../constants/listTea.js";
import { ROOT_TEA_LIST } from "../constants/root.js";
import { products } from "../add-products/addProducts.js";
import rating from '../modules/rating.js'

function coupleFn() {
	let selectWeight = document.querySelectorAll("select[name=\"weight\"]");
	selectWeight.forEach(element => {
		element.addEventListener('change', () => {
			products.selectWeight(event, TEAPRODUCTS);
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
	products.render(TEAPRODUCTS, ROOT_TEA_LIST, 'page-tea');
	coupleFn()

	const select = document.getElementById('sort');
	select.addEventListener('change', () => {
		if (select.value === 'low-high') {
			products.render(TEAPRODUCTS, ROOT_TEA_LIST, 'page-tea', 'sortLowHigh');
			coupleFn();
		} else if (select.value === 'high-low') {
			products.render(TEAPRODUCTS, ROOT_TEA_LIST, 'page-tea', 'sortHighLow');
			coupleFn();
		} else if (select.value === 'rating') {
			products.render(TEAPRODUCTS, ROOT_TEA_LIST, 'page-tea', 'rating');
			coupleFn();
		} else if (select.value === 'review') {
			products.render(TEAPRODUCTS, ROOT_TEA_LIST, 'page-tea', 'review');
			coupleFn();
		}
	});
	console.log('Tea page')
}