import { initBurger } from './components/burger.js';
import { initLocation } from './components/location.js';
import { loadProducts } from './api.js';
import { updateFilteredProducts, sortProducts, filterProducts, handleStatusChange, updateProductList } from './components/catalog.js';
import { initBasket } from './components/basket.js';
import { initAccordion } from './components/accordion.js';
import { initSlider } from './components/slider.js';
import { initValidate } from './components/validate.js';

window.addEventListener('DOMContentLoaded', async () => {
	// Загружаем товары и передаем их в слайдер
	const products = await loadProducts();

	// Проверяем, что товары загружены
	if (Array.isArray(products) && products.length > 0) {
		initSlider(products);  // Передаем товары в слайдер
	} else {
		console.error('Ошибка: товары не загружены или данные некорректны');
	}

	initBurger();
	initLocation();
	initBasket();
	initAccordion();
	initValidate();

	document.querySelector('.catalog__sort-select').value = 'rating-max'; // Устанавливаем сортировку на "Сначала популярные"

	await updateFilteredProducts();


	// Слушаем изменения в чекбоксах
	document.querySelectorAll('.custom-checkbox__field--catalog').forEach(input => {
		input.addEventListener('change', updateFilteredProducts);
	});

	// Слушаем изменения в радиокнопках статуса
	document.querySelectorAll('input[name="status"]').forEach(radio => {
		radio.addEventListener('change', handleStatusChange);
	});

	// Слушаем изменения в селекторе сортировки
	document.querySelector('.catalog__sort-select').addEventListener('change', async (event) => {
		const sortBy = event.target.value;
		const filteredProducts = await filterProducts(); // Теперь filterProducts доступна

		// Сортируем товары
		const sortedProducts = sortProducts(filteredProducts, sortBy);

		// Обновляем товары
		updateProductList(sortedProducts);
	});
});
