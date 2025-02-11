import { updateProductList, updateFilterCounts } from './components/catalog.js';

// Массив для хранения всех продуктов
let products = [];

// Загрузка товаров с сервера (только один раз)
export async function loadProducts() {
	try {
		// Если товары уже загружены, не загружаем их заново
		if (products.length === 0) {
			const response = await fetch('./data/data.json');
			if (!response.ok) {
				throw new Error('Ошибка загрузки данных');
			}
			products = await response.json();  // Сохраняем данные в глобальную переменную
		}

		updateProductList(products);  // Обновляем список товаров
		updateFilterCounts(products);  // Обновляем счетчики фильтров
		return products;  // Возвращаем сохраненные товары
	} catch (error) {
		console.error('Ошибка при загрузке продуктов:', error);
		return [];  // Возвращаем пустой массив в случае ошибки
	}
}

// Получение списка товаров
export function getProducts() {
	// Просто возвращаем уже загруженные товары
	return products;
}
