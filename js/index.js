import webpNowebp from './modules/webp-nowebp.js';
import popup from './modules/popup.js';
import { localStorageUtil } from './utils/local-storage.js';

import mainPage from './pages/main.js';
import blogPage from './pages/blog.js';
import contactsPage from './pages/contacts.js';
import personalPage from './pages/personal.js';
import cardPage from './pages/cart.js';
import catalogCoffeePage from './pages/catalog-coffee.js';
import catalogTeaPage from './pages/catalog-tea.js';
import catalogVendingPage from './pages/catalog-vending.js';
import catalogFoodPage from './pages/catalog-food.js';
import singlePage from './pages/single-product.js';

webpNowebp();
popup();

if (
	document.URL.split('/').pop() === 'index.html' ||
	document.URL.split('/').pop() === 'catalog.html' ||
	document.URL.split('/').pop() === ''
) {
	mainPage();
}
if (document.URL.split('/').pop() === 'blog.html') {
	blogPage();
}
if (document.URL.split('/').pop() === 'contacts.html') {
	contactsPage();
}
if (document.URL.split('/').pop() === 'personal.html') {
	personalPage();
}
if (document.URL.split('/').pop() === 'cart.html') {
	cardPage();
}
if (document.URL.split('/').pop() === 'catalog-coffee.html') {
	catalogCoffeePage();
}
if (document.URL.split('/').pop() === 'catalog-tea.html') {
	catalogTeaPage();
}
if (document.URL.split('/').pop() === 'catalog-vending.html') {
	catalogVendingPage();
}
if (document.URL.split('/').pop() === 'catalog-food.html') {
	catalogFoodPage();
}
if (document.URL.split('/').pop().split('-')[0] === 'page') {
	singlePage();
}
//=========================================================================

const searchInput = document.querySelector('.search__input');
const searchIcon = document.querySelector('.search__icon');
const search = document.querySelector('.search');

function addSearch() {
	document.addEventListener('click', e => {
		if (e.target == searchIcon) {
			search.classList.toggle('active');
		} else if (search.classList.contains('active') && e.target != searchInput) {
			search.classList.remove('active');
		}
	});
}
addSearch();

//=========================================================================

export const quantity = document.querySelector('.quantity span');
const productsStore = localStorageUtil.getProducts();
quantity.innerHTML = productsStore.length;

//=========================================================================
const headerFixed = document.querySelector('.header');
const main = document.querySelector('main');

window.addEventListener('scroll', () => {
	if (document.documentElement.scrollTop > 1200) {
		headerFixed.classList.add('active');
		main.classList.add('active');
	} else {
		headerFixed.classList.add('hide');
		setTimeout(() => {
			headerFixed.classList.remove('hide');
			headerFixed.classList.remove('active');
			main.classList.remove('active');
		}, 300);
	}
});
//=========================================================================

const btnMinus = document.querySelector('.page1__btn_minus');
const btnPlus = document.querySelector('.page1__btn_plus');
const summ = document.querySelector('.page1__summ');

if (btnMinus && btnPlus) {
	btnPlus.addEventListener('click', () => {
		let total = summ.innerHTML;
		++total;
		summ.innerHTML = total;
	});

	btnMinus.addEventListener('click', () => {
		if (summ.innerHTML >= 2) {
			let total = summ.innerHTML;
			--total;
			summ.innerHTML = total;
		}
	});
}

//=========================================================================
