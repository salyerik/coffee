import { localStorageUtil } from '../utils/local-storage.js';
import { COFFEE_PRODUCTS } from '../constants/coffee.js';
import { ROOT_COFFEE_LIST, ROOT_MAIN_COFFEE_LIST } from '../constants/root.js';

class ProductsCoffee {
	constructor() {
		this.classNameActive = 'buy_active';
		this.labelAdd = 'Buy';
		this.labelRemove = 'Delete';
	}

	handleSetLocationStorage(element, id) {
		const { pushProduct, products } = localStorageUtil.putProducts(id);
		const quantity = document.querySelector('.quantity span');
		if (pushProduct) {
			element.classList.add(this.classNameActive);
			element.innerHTML = this.labelRemove;
		} else {
			element.classList.remove(this.classNameActive);
			element.innerHTML = this.labelAdd;
		}
		quantity.innerHTML = products.length;
		let product = element.closest('.product');
		let select = product.querySelector('select');
	}

	selectWeight(event) {
		let product = event.target.closest('.product');
		let idProduct = product.id;
		let weight = product.querySelector('select');
		let oldPriceSpan = product.querySelector('.product__old-price span');
		let newPriceSpan = product.querySelector('.product__new-price span');
		let weightIndex = weight.selectedIndex;

		COFFEE_PRODUCTS.forEach(({ id, price, oldPrice }) => {
			if (idProduct === id) {
				if (weightIndex === 0) {
					oldPriceSpan.innerHTML = oldPrice[0];
					newPriceSpan.innerHTML = price[0];
				} else if (weightIndex === 1) {
					oldPriceSpan.innerHTML = oldPrice[1];
					newPriceSpan.innerHTML = price[1];
				} else if (weightIndex === 2) {
					oldPriceSpan.innerHTML = oldPrice[2];
					newPriceSpan.innerHTML = price[2];
				}
			}
		});
	}

	sortLowHigh(COFFEE_PRODUCTS) {
		COFFEE_PRODUCTS.sort((a, b) => (a.price[0] > b.price[0] ? 1 : -1));
	}

	sortHighLow(COFFEE_PRODUCTS) {
		COFFEE_PRODUCTS.sort((a, b) => (a.price[0] < b.price[0] ? 1 : -1));
	}

	sortByRating(COFFEE_PRODUCTS) {
		COFFEE_PRODUCTS.sort((a, b) => (a.rating < b.rating ? 1 : -1));
	}

	sortByReview(COFFEE_PRODUCTS) {
		COFFEE_PRODUCTS.sort((a, b) => (a.reviews < b.reviews ? 1 : -1));
	}

	render(methodSort) {
		const productsStore = localStorageUtil.getProducts();
		let htmlCatalog = '';
		let coffeeFlex = '';

		if (ROOT_COFFEE_LIST) {
			coffeeFlex = 'catalog4__product' + ' ';
		}

		if (methodSort == 'sortHighLow') {
			this.sortHighLow(COFFEE_PRODUCTS);
		} else if (methodSort == 'sortLowHigh') {
			this.sortLowHigh(COFFEE_PRODUCTS);
		} else if (methodSort == 'rating') {
			this.sortByRating(COFFEE_PRODUCTS);
		} else if (methodSort == 'review') {
			this.sortByReview(COFFEE_PRODUCTS);
		}

		COFFEE_PRODUCTS.forEach(
			({ id, name, descr, img, weight, price, oldPrice, reviews, rating }) => {
				let activeClass = '';
				let activeText = '';
				let imgWebp = img.split('.')[0];

				if (productsStore.indexOf(id) === -1) {
					activeText = this.labelAdd;
				} else {
					activeClass = ' ' + this.classNameActive;
					activeText = this.labelRemove;
				}

				htmlCatalog += `
				<article class="${coffeeFlex}product swiper-slide" id="${id}">
				<form action="#" class="product__body">
					<div class="product__top">
						<div class="product__top-left">
							<div class="product__percent">%</div>
							<div class="product__label">Discounts</div>
						</div>
						<div class="product__top-right">
							<select name="weight">
								<option value="${weight[0]}">${weight[0]}g.</option>
								<option value="${weight[1]}">${weight[1]}g.</option>
								<option value="${weight[2]}">${weight[2]}g.</option>
							</select>
						</div>
					</div>
					<div class="product__middle">
						<a href="page-coffee.html" class="product__img">
							<picture>
								<source srcset="${imgWebp}.webp" type="image/webp">
								<img src="${img}" alt="">
							</picture>
						</a>
						<div class="product__middle-right">
							<div class="rating">
								<div class="rating__body">
									<div class="rating__active"></div>
									<div class="rating__items">
										<input type="radio" class="rating__item" value="1" name="rating">
										<input type="radio" class="rating__item" value="2" name="rating">
										<input type="radio" class="rating__item" value="3" name="rating">
										<input type="radio" class="rating__item" value="4" name="rating">
										<input type="radio" class="rating__item" value="5" name="rating">
									</div>
								</div>
								<div class="rating__values">
									<div class="rating__value">${rating}</div>
									<a href="" class="rating__total">(${reviews} review)</a>
								</div>
							</div>
							<div class="product__roasting">
								<picture>
									<source srcset="img/icons/p-1.webp" type="image/webp">
									<img src="img/icons/p-1.png" alt="">
								</picture>
							</div>
							<div class="product__parameter">Kislinka</div>
							<div class="product__value">
								<picture>
									<source srcset="img/icons/p-2.webp" type="image/webp">
									<img src="img/icons/p-2.png" alt="">
								</picture>
							</div>
							<div class="product__parameter">bitterness</div>
							<div class="product__value">
								<picture>
									<source srcset="img/icons/p-2.webp" type="image/webp">
									<img src="img/icons/p-2.png" alt="">
								</picture>
							</div>
							<div class="product__parameter">Saturation</div>
							<div class="product__value">
								<picture>
									<source srcset="img/icons/p-2.webp" type="image/webp">
									<img src="img/icons/p-2.png" alt="">
								</picture>
							</div>
						</div>
					</div>
					<a href="page-coffee.html" class="product__title">${name}</a>
					<div class="product__text">${descr}</div>
					<div class="product__bottom">
						<div class="product__price">
							<div class="product__old-price"><span>${oldPrice[0]}</span> $</div>
							<div class="product__new-price"><span>${price[0]}</span> $</div>
						</div>
						<button type="button" class="product__btn btn buy${activeClass}">${activeText}</button>
					</div>
				</form>
			</article>
			`;
			},
		);

		if (ROOT_MAIN_COFFEE_LIST) {
			ROOT_MAIN_COFFEE_LIST.innerHTML = htmlCatalog;
		}
		if (ROOT_COFFEE_LIST) {
			ROOT_COFFEE_LIST.innerHTML = htmlCatalog;
		}
	}
}

const coffeeProductsPage = new ProductsCoffee();
export { coffeeProductsPage };
