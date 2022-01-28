export default function () {
	const ratings = document.querySelectorAll('.rating');

	if (ratings.length > 0) {
		initRatings();
	}

	// Основная функция
	function initRatings() {
		let ratingActive, ratingValue;
		// "Бегаем" по всем рейтингам на странице
		for (let i = 0; i < ratings.length; i++) {
			const rating = ratings[i];
			initRating(rating);
		}

		// Инициализируем конкретный рейтинг
		function initRating(rating) {
			initRatingVars(rating);

			setRatingActiveWidth();

			if (rating.classList.contains('rating_set')) {
				setRating(rating);
			}
		}

		// Инициализация переменных
		function initRatingVars(rating) {
			ratingActive = rating.querySelector('.rating__active');
			ratingValue = rating.querySelector('.rating__value');
		}

		// Изменяем ширину активных звёзд
		function setRatingActiveWidth(index = ratingValue.innerHTML) {
			const ratingActiveWidth = index / 0.05;
			ratingActive.style.width = `${ratingActiveWidth}%`;
		}

		// Возможность указать оценку
		function setRating(rating) {
			const ratingItems = rating.querySelectorAll('.rating__item');
			for (let i = 0; i < ratingItems.length; i++) {
				const ratingItem = ratingItems[i];
				ratingItem.addEventListener("mouseenter", (e) => {
					// Обновление переменных
					initRatingVars(rating);
					// Обновление активных звёзд
					setRatingActiveWidth(ratingItem.value);
				});
				ratingItem.addEventListener("mouseleave", (e) => {
					// Обновление активных звёзд
					setRatingActiveWidth();
				});
				ratingItem.addEventListener("click", (e) => {
					// Обновление переменных
					initRatingVars(rating);

					if (rating.dataset.ajax) {
						// Отправить на сервер
						setRatingValue(ratingItem.value, rating);
					} else {
						// Отобразить указанную оценку
						ratingValue.innerHTML = i + 1 + '.0';
						setRatingActiveWidth();
					}
				});
			}
		}

		async function setRatingValue(value, rating) {
			if (!rating.classList.contains('rating_sending')) {
				rating.classList.add('rating_sending');

				// Отправка данных (value) на сервер
				let response = await fetch('rating.json', {
					method: 'GET',

					// body: JSON.stringify({
					// 	userRating: value
					// }),
					// headers: {
					// 	'content-type': 'application/json'
					// }
				});

				if (response.ok) {
					const result = await response.json();

					// Получаем новый рейтинг
					const newRating = result.newRating;

					// Вывод нового среднего результата
					ratingValue.innerHTML = newRating;

					// Обновление активных звёзд
					setRatingActiveWidth();

					rating.classList.remove('rating_sending');
				} else {
					alert("Ошибка");

					rating.classList.remove('rating_sending');
				}
			}
		}
	}
}