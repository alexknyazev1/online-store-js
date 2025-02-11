const openBtn = document.querySelector('.header__catalog-btn');
const closeBtn = document.querySelector('.main-menu__close');
const mainMenu = document.querySelector('.main-menu');

function burgerActive() {
	mainMenu.classList.add('main-menu--active');
}

function burgerClose() {
	mainMenu.classList.remove('main-menu--active');
}

export function initBurger() {
	openBtn.addEventListener('click', burgerActive);
	closeBtn.addEventListener('click', burgerClose);
}