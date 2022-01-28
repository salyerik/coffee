import tabs from '../modules/tabs.js'

export default function () {
	const tabsBtn = document.querySelectorAll(".tabs__btn");
	const tabsBlock = document.querySelectorAll(".tabs__block");

	tabsBtn.forEach(element => {
		tabs(element, tabsBtn, tabsBlock)
	});
	console.log('Contacts page')
}