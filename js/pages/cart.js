import { localStorageUtil } from '../utils/local-storage.js';
import { COFFEE_PRODUCTS } from '../constants/coffee.js';
import { FOOD_PRODUCTS } from '../constants/food.js';
import { TEA_PRODUCTS } from '../constants/tea.js';
import { VENDING_PRODUCTS } from '../constants/vending.js';
import { ROOT_CARD_LIST } from '../constants/root.js';
import { quantity } from '../index.js';

export default function () {
	const cardQuantity = document.querySelector('.card-top__summ');
	const cardDeleteAll = document.querySelector('.card-top__delete-all');
	const cardTopInfo = document.querySelector('.card-top__info');
	const cardMiddle = document.querySelector('.card__middle');
	const cardBottom = document.querySelector('.card__bottom');
	const cardTotalPrice = document.querySelector('.card-bottom__price span');
	const cardTotalNoDiscount = document.querySelector(
		'.card-bottom__pre-price span',
	);
	const cardTotalDiscount = document.querySelector(
		'.card-bottom__discount span',
	);
	let summCatalog = 0;
	let summCatalogNoDiscount = 0;
	let summCatalogDiscount = 0;

	function addCardElements() {
		cardDeleteAll.classList.add('active');
		cardTopInfo.classList.add('active');
		cardMiddle.classList.add('active');
		cardBottom.classList.add('active');
	}

	function removeCardElements() {
		cardDeleteAll.classList.remove('active');
		cardTopInfo.classList.remove('active');
		cardMiddle.classList.remove('active');
		cardBottom.classList.remove('active');
	}

	function addRemoveCardElements() {
		if (ROOT_CARD_LIST) {
			if (ROOT_CARD_LIST.children.length >= 1) {
				removeCardElements();
			} else {
				addCardElements();
			}
		}
	}

	function totalCardElements() {
		if (products === 1) {
			cardQuantity.innerHTML = products + ' item in cart';
		} else if (products >= 2) {
			cardQuantity.innerHTML = products + ' items in the cart';
		} else {
			cardQuantity.innerHTML = 'Cart is empty';
		}
	}

	function cardTotal() {
		if (cardTotalPrice) {
			cardTotalPrice.innerHTML = summCatalog.toLocaleString();
			cardTotalNoDiscount.innerHTML = summCatalogNoDiscount.toLocaleString();
			cardTotalDiscount.innerHTML = summCatalogDiscount.toLocaleString();
		}
	}

	if (cardDeleteAll) {
		cardDeleteAll.addEventListener('click', function () {
			localStorage.clear();
			ROOT_CARD_LIST.innerHTML = '';
			quantity.innerHTML = '0';
			cardQuantity.innerHTML = 'Cart is empty';
			addCardElements();
		});
	}

	class Card {
		handleSetLocationStorage(element, id) {
			let { pushProduct, products } = localStorageUtil.putProducts(id);
			element.parentElement.remove();
			products = products.length;
			quantity.innerHTML = products;
			if (products === 1) {
				cardQuantity.innerHTML = products + ' item in cart';
			} else if (products >= 2) {
				cardQuantity.innerHTML = products + ' items in the cart';
			} else {
				cardQuantity.innerHTML = 'Cart is empty';
			}
			// totalCardElements();
			addRemoveCardElements();
			let productPrice =
				element.parentElement.children[2].children[1].innerHTML;
			summCatalog -= (productPrice / 10) * 9;
			summCatalogNoDiscount -= productPrice;
			summCatalogDiscount -= productPrice / 10;
			cardTotal();
		}

		quantityMinus(event, category) {
			let item = event.target.closest('.card-top__item');
			let itemId = item.id;
			let quantity = item.querySelector('input');
			let priceSpan = item.querySelector('.card-top__total span');
			let priceNumber = +priceSpan.innerHTML;
			let discountSpan = item.querySelector('.card-top__discount span');
			let discountNumber = +discountSpan.innerHTML;
			category.forEach(({ id, price }) => {
				if (itemId === id) {
					if (quantity.value > 1) {
						priceNumber -= (price[0] / 10) * 9;
						priceSpan.innerHTML = priceNumber;
						discountNumber -= price[0] / 10;
						discountSpan.innerHTML = discountNumber;
						quantity.value = Number(--quantity.value);
						summCatalog -= (price[0] / 10) * 9;
						summCatalogNoDiscount -= price[0];
						summCatalogDiscount -= price[0] / 10;
						cardTotal();
					}
				}
			});
		}

		quantityPlus(event, category) {
			let item = event.target.closest('.card-top__item');
			let itemId = item.id;
			let quantity = item.querySelector('input');
			let priceSpan = item.querySelector('.card-top__total span');
			let priceNumber = +priceSpan.innerHTML;
			let discountSpan = item.querySelector('.card-top__discount span');
			let discountNumber = +discountSpan.innerHTML;
			category.forEach(({ id, price }) => {
				if (itemId === id) {
					priceNumber += (price[0] / 10) * 9;
					priceSpan.innerHTML = priceNumber;
					discountNumber += price[0] / 10;
					discountSpan.innerHTML = discountNumber;
					quantity.value = Number(++quantity.value);
					summCatalog += (price[0] / 10) * 9;
					summCatalogNoDiscount += price[0];
					summCatalogDiscount += price[0] / 10;
					cardTotal();
				}
			});
		}

		render(category) {
			const productsStore = localStorageUtil.getProducts();
			let htmlCatalog = '';
			category.forEach(({ id, img, name, descr, weight, price }) => {
				if (productsStore.indexOf(id) !== -1) {
					htmlCatalog += `
				<div class="card-top__item" id="${id}">
					<button type="button" class="card-top__delete">
						<img src="img/icons/card-cross.svg" alt="">
					</button>
					<div class="card-top__name">
						<div class="card-top__img">
							<img src="${img}" alt="">
						</div>
						<div class="card-top__text">
							<div class="card-top__title">${name}</div>
							<div class="card-top__label">${descr}</div>
							<div class="card-top__weight"><span>${weight[0]}</span>g.</div>
						</div>
					</div>
					<div class="card-top__price">
						<p>Price:</p><span>${price[0]}</span> $
					</div>
					<div class="card-top__quantity">
						<button type="button" class="card-top__btn card-top__btn_minus">-</button>
						<input type="number" class="card-top__number" value="1" disabled>
						<button type="button" class="card-top__btn card-top__btn_plus">+</button>
					</div>
					<div class="card-top__discount">
						<p>Discount:</p><span>${price[0] / 10}</span> $
					</div>
					<div class="card-top__total">
						<p>Total:</p><span>${(price[0] / 10) * 9}</span> $
					</div>
				</div>
				`;
					summCatalog += (price[0] / 10) * 9;
					summCatalogNoDiscount += price[0];
					summCatalogDiscount += price[0] / 10;
					cardTotal();
				}
			});

			if (ROOT_CARD_LIST) {
				ROOT_CARD_LIST.innerHTML += htmlCatalog;
			}
			addRemoveCardElements();
		}
	}

	const cardCoffeePage = new Card();
	cardCoffeePage.render(COFFEE_PRODUCTS);

	const cardTeaPage = new Card();
	cardTeaPage.render(TEA_PRODUCTS);

	const cardFoodPage = new Card();
	cardFoodPage.render(FOOD_PRODUCTS);

	const cardVendingPage = new Card();
	cardVendingPage.render(
		VENDING_PRODUCTS,
		'cardVendingPage',
		'VENDING_PRODUCTS',
	);

	const cardDeleteBtn = document.querySelectorAll('.card-top__delete');
	cardDeleteBtn.forEach(btn =>
		btn.addEventListener('click', () => {
			const id = btn.closest('.card-top__item').getAttribute('id');
			cardCoffeePage.handleSetLocationStorage(btn, id);
		}),
	);
	const minusBtns = document.querySelectorAll('.card-top__btn_minus');
	minusBtns.forEach(btn =>
		btn.addEventListener('click', () => {
			cardCoffeePage.quantityMinus(event, COFFEE_PRODUCTS);
			cardTeaPage.quantityMinus(event, TEA_PRODUCTS);
			cardFoodPage.quantityMinus(event, FOOD_PRODUCTS);
			cardVendingPage.quantityMinus(event, VENDING_PRODUCTS);
		}),
	);
	const plusBtns = document.querySelectorAll('.card-top__btn_plus');
	plusBtns.forEach(btn =>
		btn.addEventListener('click', () => {
			cardCoffeePage.quantityPlus(event, COFFEE_PRODUCTS);
			cardTeaPage.quantityPlus(event, TEA_PRODUCTS);
			cardFoodPage.quantityPlus(event, FOOD_PRODUCTS);
			cardVendingPage.quantityPlus(event, VENDING_PRODUCTS);
		}),
	);

	let products = ROOT_CARD_LIST.children.length;
	totalCardElements();
}
