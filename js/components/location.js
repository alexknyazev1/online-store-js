const openBtn = document.querySelector('.location__city');
const locationList = document.querySelector('.location__sublist');
const locationCityName = document.querySelector('.location__city-name');

function showLocation() {
	// Переключаем видимость списка
	locationList.classList.toggle('location__sublist--active');
	openBtn.classList.toggle('location__city--active');
}

function selectLocation(event) {
	// Получаем название выбранного города
	const selectLocation = event.target.textContent;
	locationCityName.textContent = selectLocation;

	// Скрываем список после выбора города
	locationList.classList.remove('location__sublist--active');
	openBtn.classList.remove('location__city--active');
}

export function initLocation() {
	// Обработчик для кнопки открытия/закрытия списка
	openBtn.addEventListener('click', showLocation);

	// Перебираем все элементы списка и добавляем обработчик на клик
	const locationLinks = document.querySelectorAll('.location__sublink');
	locationLinks.forEach((location) => location.addEventListener('click', selectLocation));
}
