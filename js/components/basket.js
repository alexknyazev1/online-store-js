export function initBasket() {
	const basketBtn = document.querySelector('.header__user-btn');
	const basketEl = document.querySelector('.basket');
	const basketCountEl = document.querySelector('.header__user-count'); // Счетчик корзины
	const basketListEl = document.querySelector('.basket__list');
	const basketEmptyBlock = document.querySelector('.basket__empty-block'); // Блок "Корзина пуста"
	const basketLink = document.querySelector('.basket__link'); // Кнопка "Перейти к оформлению"

	if (!basketCountEl) {
		console.error('Элемент .header__user-count не найден!');
	}

	let basketItems = [];

	// Функция обновления количества товаров в корзине
	function updateBasketCount() {
		if (basketCountEl) {
			basketCountEl.textContent = basketItems.length; // Обновляем текст в счетчике
			if (!basketItems.length) {
				basketEl.classList.add('basket--empty');
				basketEmptyBlock.style.display = 'block'; // Показываем блок "Корзина пуста"
				// Скрываем кнопку "Перейти к оформлению"
				if (basketLink) {
					basketLink.style.display = 'none';
				}
			} else {
				basketEl.classList.remove('basket--empty');
				basketEmptyBlock.style.display = 'none'; // Скрываем блок "Корзина пуста"
				// Показываем кнопку "Перейти к оформлению"
				if (basketLink) {
					basketLink.style.display = 'block';
				}
			}
		}
	}

	// Функция добавления товара в корзину
	function addToBasket(product) {
		basketItems.push(product);
		updateBasketCount();

		const basketItemEl = document.createElement('li');
		basketItemEl.classList.add('basket__item');
		basketItemEl.dataset.productId = product.id; // Добавляем уникальный ID для удаления
		basketItemEl.innerHTML = `
      <div class="basket__img">
        <img src="${product.image}" alt="Фотография товара" height="60" width="60">
      </div>
      <span class="basket__name">${product.name}</span>
      <span class="basket__price">${product.price.new.toLocaleString('ru-RU')} ₽</span>
      <button class="basket__item-close" type="button">
        <svg class="main-menu__icon" width="24" height="24" aria-hidden="true">
          <use xlink:href="images/sprite.svg#icon-close"></use>
        </svg>
      </button>
    `;
		basketListEl.appendChild(basketItemEl);
	}

	// Функция удаления товара из корзины
	function removeFromBasket(event) {
		const button = event.target.closest('.basket__item-close');
		if (!button) return;

		const basketItemEl = button.closest('.basket__item');
		const productId = basketItemEl.dataset.productId;

		// Удаляем товар из массива корзины
		basketItems = basketItems.filter(item => item.id !== Number(productId));

		updateBasketCount(); // Обновляем счетчик
		basketItemEl.remove(); // Удаляем товар из DOM
	}

	// Инициализация корзины
	function init() {
		basketBtn.addEventListener('click', function () {
			basketEl.classList.toggle('basket--active');
		});

		document.addEventListener('click', function (event) {
			if (event.target.closest('.js-basket')) {
				event.preventDefault();
				const productCard = event.target.closest('.product-card');
				const productData = JSON.parse(productCard.dataset.product);
				addToBasket(productData);
			}
		});

		basketListEl.addEventListener('click', removeFromBasket);
	}

	init();
}
