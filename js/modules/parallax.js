export default function () {
	// Контейнер где будет приосходить эффект
	const parallax = document.querySelector('.parallax');

	if (parallax) {
		// Сами элементы для эффекта
		const parallaxItems = document.querySelectorAll('.parallax-item');

		parallaxItems.forEach(el => {
			const parallaxCoefficientX = 5;
			const parallaxCoefficientY = 2;

			const speed = 1;

			let positionX = 0,
				positionY = 0;
			let coordXpercent = 0,
				coordYpercent = 0;

			// Параллакс при движении мыши
			function setMouseParallaxStyle() {
				const distX = coordXpercent - positionX;
				const distY = coordYpercent - positionY;

				positionX = positionX + distX * speed;
				positionY = positionY + distY * speed;

				// Передаем стили
				el.style.cssText = `transform: translate(${
					positionX / parallaxCoefficientX
				}%, ${positionY / parallaxCoefficientY}%);`;

				requestAnimationFrame(setMouseParallaxStyle);
			}
			setMouseParallaxStyle();

			parallax.addEventListener('mousemove', e => {
				// Получение ширины и высоты объекта
				const parallaxWidth = parallax.offsetWidth;
				const parallaxHeight = parallax.offsetHeight;

				// Ноль по середине
				const coordX = e.pageX - parallaxWidth / 2;
				const coordY = e.pageY - parallaxHeight / 2;

				coordXpercent = (coordX / parallaxWidth) * 100;
				coordYpercent = (coordY / parallaxHeight) * 100;
			});
		});
	}
}
