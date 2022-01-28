import spoiler from '../modules/spoiler.js'
import tabs from '../modules/tabs.js'

export default function () {

	const tabsBtn = document.querySelectorAll(".tabs__btn");
	const tabsBlock = document.querySelectorAll(".tabs__block");
	const tabs2Btn = document.querySelectorAll(".tabs2__btn");
	const tabs2Block = document.querySelectorAll(".tabs2__block");
	const tabs3Btn = document.querySelectorAll(".tabs3__btn");
	const tabs3Block = document.querySelectorAll(".tabs3__block");

	tabsBtn.forEach(element => {
		tabs(element, tabsBtn, tabsBlock)
	});
	tabs2Btn.forEach(element => {
		tabs(element, tabs2Btn, tabs2Block)
	});
	tabs3Btn.forEach(element => {
		tabs(element, tabs3Btn, tabs3Block)
	});
	spoiler()
	console.log('Blog page')
}