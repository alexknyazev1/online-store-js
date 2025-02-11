export function createCard(productData) {
	return `
    <div class="product-card" data-product='${JSON.stringify(productData)}'>
      <div class="product-card__visual">
        <img class="product-card__img" src="${productData.image}" height="436" width="290" alt="Изображение товара">
        <div class="product-card__more">
          <a href="#" class="product-card__link btn btn--icon js-basket" data-id="${productData.id}">
            <span class="btn__text">В корзину</span>
            <svg width="24" height="24" aria-hidden="true">
              <use xlink:href="images/sprite.svg#icon-basket"></use>
            </svg>
          </a>
          <a href="#" class="product-card__link btn btn--secondary">
            <span class="btn__text">Подробнее</span>
          </a>
        </div>
      </div>
      <div class="product-card__info">
        <h2 class="product-card__title">${productData.name}</h2>
        <span class="product-card__old">
          <span class="product-card__old-number">${productData.price.old.toLocaleString('ru-RU')}</span>
          <span class="product-card__old-add">₽</span>
        </span>
        <span class="product-card__price">
          <span class="product-card__price-number">${productData.price.new.toLocaleString('ru-RU')}</span>
          <span class="product-card__price-add">₽</span>
        </span>
      </div>
    </div>
  `;
}
