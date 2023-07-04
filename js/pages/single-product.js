import tabs from '../modules/tabs.js';
import rating from '../modules/rating.js';

export default function () {
	const tabsBtn = document.querySelectorAll('.tabs__btn');
	const tabsBlock = document.querySelectorAll('.tabs__block');

	if (tabsBtn) {
		tabsBtn.forEach(element => {
			tabs(element, tabsBtn, tabsBlock);
		});
	}
	rating();
}
