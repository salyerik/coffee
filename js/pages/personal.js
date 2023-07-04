import tabs from '../modules/tabs.js';

export default function () {
	const personalRight = document.querySelector('.personal-top__right');
	const personalInfo = document.querySelector('.personal-top__info');

	if (personalInfo) {
		personalInfo.addEventListener('mouseenter', () => {
			personalRight.classList.add('active');
		});
		personalInfo.addEventListener('mouseleave', () => {
			personalRight.classList.remove('active');
		});
	}

	//=========================================================================

	const personalButton = document.querySelector('.personal-top__btn');
	const personalMiddle = document.querySelector('.personal-top__middle');

	if (personalButton) {
		personalButton.addEventListener('click', () => {
			if (personalButton.innerHTML == 'Save') {
				personalButton.innerHTML = 'Change';
			} else {
				personalButton.innerHTML = 'Save';
			}
			personalMiddle.classList.toggle('active');
		});
	}

	//=========================================================================

	const personalBtn = document.querySelectorAll('.personal-tabs__btn');
	const personalBlock = document.querySelectorAll('.personal-tabs__block');

	personalBtn.forEach(element => {
		tabs(element, personalBtn, personalBlock);
	});
}
