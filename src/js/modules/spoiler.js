"use strict"

export default function () {
	const spoilersArray = document.querySelectorAll('[data-spoilers]');
	if (spoilersArray.length > 0) {
		//Получение обычных спойлеров
		const spoilersRegular = Array.from(spoilersArray).filter(function (item, index, self) {
			return !item.dataset.spoilers.split(",")[0];
		});
		//Инициализация обычных спойлеров
		if (spoilersRegular.length > 0) {
			initspoilers(spoilersRegular);
		}

		//Получение спойлеров с медиа запросами
		const spoilersMedia = Array.from(spoilersArray).filter(function (item, index, self) {
			return item.dataset.spoilers.split(",")[0];
		});

		//Инициализация спойлеров с медиа запросами
		if (spoilersMedia.length > 0) {
			const breakpointsArray = [];
			spoilersMedia.forEach(item => {
				const params = item.dataset.spoilers;
				const breakpoint = {};
				const paramsArray = params.split(",");
				breakpoint.value = paramsArray[0];
				breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
				breakpoint.item = item;
				breakpointsArray.push(breakpoint);
			});

			//Получаем уникальные брейкпоинты
			let mediaQueries = breakpointsArray.map(function (item) {
				return '(' + item.type + "-width: " + item.value + "px)," + item.value + ',' + item.type;
			});
			mediaQueries = mediaQueries.filter(function (item, index, self) {
				return self.indexOf(item) === index;
			});

			//Работаем с каждым брейкпоитом
			mediaQueries.forEach(breakpoint => {
				const paramsArray = breakpoint.split(",");
				const mediaBreakpoint = paramsArray[1];
				const mediaType = paramsArray[2];
				const matchMedia = window.matchMedia(paramsArray[0]);

				//Объекты с нужными условиями
				const spoilersArray = breakpointsArray.filter(function (item) {
					if (item.value === mediaBreakpoint && item.type === mediaType) {
						return true;
					}
				});
				//Событие
				matchMedia.addListener(function () {
					initspoilers(spoilersArray, matchMedia);
				});
				initspoilers(spoilersArray, matchMedia);
			});
		}
		//Инициализация
		function initspoilers(spoilersArray, matchMedia = false) {
			spoilersArray.forEach(spoilersBlock => {
				spoilersBlock = matchMedia ? spoilersBlock.item : spoilersBlock;
				if (matchMedia.matches || !matchMedia) {
					spoilersBlock.classList.add('init');
					initspoilerBody(spoilersBlock);
					spoilersBlock.addEventListener("click", setspoilerAction);
				} else {
					spoilersBlock.classList.remove('init');
					initspoilerBody(spoilersBlock, false);
					spoilersBlock.removeEventListener("click", setspoilerAction);
				}
			});
		}
		//Работа с контентом
		function initspoilerBody(spoilersBlock, hidespoilerBody = true) {
			const spoilerTitles = spoilersBlock.querySelectorAll('[data-spoiler]');
			if (spoilerTitles.length > 0) {
				spoilerTitles.forEach(spoilerTitle => {
					if (hidespoilerBody) {
						spoilerTitle.removeAttribute('tabindex');
						if (!spoilerTitle.classList.contains('active')) {
							spoilerTitle.nextElementSibling.hidden = true;
						}
					} else {
						spoilerTitle.setAttribute('tabindex', '-1');
						spoilerTitle.nextElementSibling.hidden = false;
					}
				});
			}
		}
		function setspoilerAction(e) {
			const el = e.target;
			if (el.hasAttribute('data-spoiler') || el.closest('[data-spoiler]')) {
				const spoilerTitle = el.hasAttribute('data-spoiler') ? el : el.closest('[data-spoiler]');
				const spoilersBlock = spoilerTitle.closest('[data-spoilers]');
				const onespoiler = spoilersBlock.hasAttribute('data-one-spoiler') ? true : false;
				if (!spoilersBlock.querySelectorAll('.slide').length) {
					if (onespoiler && !spoilerTitle.classList.contains('active')) {
						hidespoilersBody(spoilersBlock);
					}
					spoilerTitle.classList.toggle('active');
					slideToggle(spoilerTitle.nextElementSibling, 500);
				}
				e.preventDefault();
			}
		}
		function hidespoilersBody(spoilersBlock) {
			const spoilerActiveTitle = spoilersBlock.querySelector('[data-spoiler].active');
			if (spoilerActiveTitle) {
				spoilerActiveTitle.classList.remove('active');
				slideUp(spoilerActiveTitle.nextElementSibling, 500);
			}
		}
	}

	//SlideToogle
	let slideUp = (target, duration = 500) => {
		if (!target.classList.contains('slide')) {
			target.classList.add('slide');
			target.style.transitionProperty = 'height, margin, padding';
			target.style.transitionDuration = duration + 'ms';
			target.style.height = target.offsetHeight + 'px';
			target.offsetHeight;
			target.style.overflow = 'hidden';
			target.style.height = 0;
			target.style.paddingTop = 0;
			target.style.paddingBottom = 0;
			target.style.marginTop = 0;
			target.style.marginBottom = 0;
			window.setTimeout(() => {
				target.hidden = true;
				target.style.removeProperty('height');
				target.style.removeProperty('padding-top');
				target.style.removeProperty('padding-bottom');
				target.style.removeProperty('margin-top');
				target.style.removeProperty('margin-bottom');
				target.style.removeProperty('overflow');
				target.style.removeProperty('transition-duration');
				target.style.removeProperty('transition-property');
				target.classList.remove('slide');
			}, duration);
		}
	}
	let slideDown = (target, duration = 500) => {
		if (!target.classList.contains('slide')) {
			target.classList.add('slide');
			if (target.hidden) {
				target.hidden = false;
			}
			let height = target.offsetHeight;
			target.style.overflow = 'hidden';
			target.style.height = 0;
			target.style.paddingTop = 0;
			target.style.paddingBottom = 0;
			target.style.marginTop = 0;
			target.style.marginBottom = 0;
			target.offsetHeight;
			target.style.transitionProperty = 'height, margin, padding';
			target.style.transitionDuration = duration + 'ms';
			target.style.height = height + 'px';
			target.style.removeProperty('padding-top');
			target.style.removeProperty('padding-bottom');
			target.style.removeProperty('margin-top');
			target.style.removeProperty('margin-bottom');
			window.setTimeout(() => {
				target.style.removeProperty('height');
				target.style.removeProperty('overflow');
				target.style.removeProperty('transition-duration');
				target.style.removeProperty('transition-property');
				target.classList.remove('slide');
			}, duration);
		}
	}
	let slideToggle = (target, duration = 500) => {
		if (target.hidden) {
			return slideDown(target, duration);
		} else {
			return slideUp(target, duration);
		}
	}
}
/*
Для родителя спойлеров пишем атрибут data-spoilers
Для заголовков спойлеров пишем атрибут data-spoiler
Если нужно включать/выключать работу спойлеров на разных размерах экранов
пишем параметры ширины и типа брейкпоинта.
Например:
data-spoilers="992,max" - спойлеры будут рабоать на экранах меньше или равно 992px
data-spoilers="768,min" - спойлеры будут рабоать на экранах больше или равно 768px

Если нужно что бы в блоке открывался только один спойлер, то добавляем атрибут data-one-spoiler
*/