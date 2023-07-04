import { localStorageUtil } from '../utils/local-storage.js';

class Products {
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
	}

	selectWeight(event, catalog) {
		let product = event.target.closest('.product');
		let idProduct = product.id;
		let weight = product.querySelector('select');
		let newPriceSpan = product.querySelector('.product__new-price span');
		let weightIndex = weight.selectedIndex;

		catalog.forEach(({ id, price }) => {
			if (idProduct === id) {
				if (weightIndex === 0) {
					newPriceSpan.innerHTML = price[0];
				} else if (weightIndex === 1) {
					newPriceSpan.innerHTML = price[1];
				} else if (weightIndex === 2) {
					newPriceSpan.innerHTML = price[2];
				}
			}
		});
	}

	sortLowHigh(catalog) {
		catalog.sort((a, b) => (a.price[0] > b.price[0] ? 1 : -1));
	}

	sortHighLow(catalog) {
		catalog.sort((a, b) => (a.price[0] < b.price[0] ? 1 : -1));
	}

	sortByRating(catalog) {
		catalog.sort((a, b) => (a.rating < b.rating ? 1 : -1));
	}

	sortByReview(catalog) {
		catalog.sort((a, b) => (a.reviews < b.reviews ? 1 : -1));
	}

	render(catalog, catalogList, page, methodSort) {
		const productsStore = localStorageUtil.getProducts();
		let htmlCatalog = [];

		if (methodSort == 'sortHighLow') {
			this.sortHighLow(catalog);
		} else if (methodSort == 'sortLowHigh') {
			this.sortLowHigh(catalog);
		} else if (methodSort == 'rating') {
			this.sortByRating(catalog);
		} else if (methodSort == 'review') {
			this.sortByReview(catalog);
		}

		catalog.forEach(
			({ id, name, descr, img, weight, price, reviews, rating }) => {
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
				<article class="catalog4__product catalog4__product_tea product" id="${id}">
				<div class="product__body">
					<div class="product__top product__top_2">
						<div class="product__top-left product__top-left_2">
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
						</div>
						<div class="product__top-right">
							<select id="weight" name="weight">
								<option value="${weight[0]}">${weight[0]}g.</option>
								<option value="${weight[1]}">${weight[1]}g.</option>
								<option value="${weight[2]}">${weight[2]}g.</option>
							</select>
						</div>
					</div>
					<div class="product__middle">
						<a href="${page}.html" class="product__img">
							<picture>
								<source srcset="${imgWebp}.webp" type="image/webp">
								<img src="${img}" alt="">
							</picture>
						</a>
					</div>
					<a href="${page}.html" class="product__title">${name}</a>
					<div class="product__text">${descr}</div>
					<div class="product__bottom">
						<div class="product__price">
							<div class="product__new-price"><span>${price[0]}</span> $</div>
						</div>
						<button type="button" class="product__btn btn buy${activeClass}">${activeText}</button>
					</div>
				</div>
			</article>
			`;
			},
		);

		if (catalogList) {
			catalogList.innerHTML = htmlCatalog;
		}
	}
}

export const products = new Products();
