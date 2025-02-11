const accordionBtns = document.querySelectorAll('.accordion__btn');

export function initAccordion() {
	accordionBtns.forEach((accordionBtn) => {
		accordionBtn.addEventListener('click', function () {
			accordionBtn.classList.toggle('accordion__btn--active');
		});
	});
}
