import { createCard } from './card.js';
import { getProducts } from '../api.js';

let selectedFilters = [];
let selectedStatus = 'all-item'; // По умолчанию показываем все товары
let selectedSortBy = 'rating-max'; // По умолчанию сортировка по популярным

// Обновление счетчиков для фильтров
export function updateFilterCounts(products) {
	const counts = {
		pendant: 0,
		ceiling: 0,
		overhead: 0,
		point: 0,
		nightlights: 0,
	};

	// Считаем количество товаров в каждой категории, не фильтруя по выбранным фильтрам
	products.forEach(product => {
		product.type.forEach(type => {
			if (counts[type] !== undefined) {
				counts[type]++;
			}
		});
	});

	// Обновляем счетчики на интерфейсе
	document.querySelector('.custom-checkbox--pendant .custom-checkbox__count').textContent = counts.pendant;
	document.querySelector('.custom-checkbox--ceiling .custom-checkbox__count').textContent = counts.ceiling;
	document.querySelector('.custom-checkbox--overhead .custom-checkbox__count').textContent = counts.overhead;
	document.querySelector('.custom-checkbox--point .custom-checkbox__count').textContent = counts.point;
	document.querySelector('.custom-checkbox--nightlights .custom-checkbox__count').textContent = counts.nightlights;
}

// Обновление списка товаров
export function updateProductList(products) {
	const listEl = document.querySelector('.catalog__list');
	listEl.innerHTML = ''; // Очистить текущий список товаров

	products.forEach(productData => {
		const cardEl = createCard(productData);
		const liEl = document.createElement('li');
		liEl.classList.add('catalog__item');
		liEl.innerHTML = cardEl;
		listEl.appendChild(liEl);
	});
}

// Обновление выбранных фильтров
export function updateSelectedFilters() {
	selectedFilters = [];
	document.querySelectorAll('.custom-checkbox__field--catalog:checked').forEach(input => {
		selectedFilters.push(input.value);
	});
}

// Обновление статуса
export function updateSelectedStatus() {
	selectedStatus = document.querySelector('input[name="status"]:checked').value;
}

// Фильтрация товаров по статусу
export function filterByStatus(products) {
	if (selectedStatus === 'instock') {
		const inStockProducts = products.filter(product => {
			// Суммируем количество товара по регионам
			const totalStock = Object.values(product.availability).reduce((sum, count) => sum + count, 0);

			// Если общее количество товара больше 0, то он в наличии
			return totalStock > 0;
		});

		return inStockProducts;
	}
	return products; // Все товары
}

// Фильтрация товаров по выбранным фильтрам
export async function filterProducts() {
	updateSelectedFilters();
	updateSelectedStatus();

	const products = await getProducts();
	let filteredProducts = filterByStatus(products);

	if (!selectedFilters.length) {
		return filteredProducts;
	}

	return filteredProducts.filter(product => selectedFilters.every(filter => product.type.includes(filter)));
}

// Сортировка товаров
export function sortProducts(products, sortBy) {
	switch (sortBy) {
		case 'price-min':
			return products.sort((a, b) => a.price.new - b.price.new);
		case 'price-max':
			return products.sort((a, b) => b.price.new - a.price.new);
		case 'rating-max':
			return products.sort((a, b) => b.rating - a.rating);
		default:
			return products;
	}
}

// Обработчики событий
export async function updateFilteredProducts() {
	// Получаем отфильтрованные товары
	const filteredProducts = await filterProducts();

	// Сортируем товары по текущей выбранной сортировке
	const sortedProducts = sortProducts(filteredProducts, selectedSortBy);

	// Получаем все товары для обновления счетчиков фильтров
	const allProducts = await getProducts();

	// Обновляем список товаров
	updateProductList(sortedProducts);

	// Обновляем счетчики с использованием всех товаров
	updateFilterCounts(allProducts);
}

// Обработчик изменения статуса
export function handleStatusChange() {
	updateFilteredProducts();
}

// Обработчик изменения сортировки товаров
export function handleSortChange(event) {
	const sortBy = event.target.value; // Получаем выбранное значение для сортировки

	// Сохраняем выбранное значение сортировки
	selectedSortBy = sortBy;

	// Получаем все отфильтрованные товары
	filterProducts().then(filteredProducts => {
		// Сортируем товары в зависимости от выбранного параметра
		const sortedProducts = sortProducts(filteredProducts, sortBy);

		// Обновляем список товаров на странице
		updateProductList(sortedProducts);
	});
}

// Обработчик кнопки сброса фильтров
document.querySelector('.catalog-form__reset').addEventListener('click', async (event) => {
	event.preventDefault(); // Предотвращаем обычное поведение кнопки сброса

	// Сброс всех фильтров и радиокнопок
	document.querySelectorAll('.custom-checkbox__field').forEach(checkbox => checkbox.checked = false);
	document.querySelector('#all-item').checked = true; // Устанавливаем "Все" как выбранный статус

	// Сброс состояния фильтров и статуса
	selectedFilters = [];
	selectedStatus = 'all-item';

	// Получаем все товары без фильтрации
	const allProducts = await getProducts();
	updateProductList(allProducts); // Обновляем список товаров
	updateFilterCounts(allProducts); // Обновляем счетчики фильтров
});
