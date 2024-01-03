/**
 * Закрытие модального окна
 * @param evt Событие клика (приходит из on:click)
 */
const closeModal = function (evt) {
    // открытое модальное окно
    const modal = document.querySelector('.modal_opened');

    // проверяет, находится ли событие внутри модального окна
    const in_modal = modal.contains(evt.target);

    const close_button = modal.querySelector('.close-button');

    if (!in_modal || evt.target === close_button) {
        modal.classList.add('modal_closed');
        modal.classList.remove('modal_opened');

        const blurred = document.querySelectorAll('.blur'); // все фоновые элементы
        blurred.forEach((item) => item.classList.remove('blur'));

        close_button.removeEventListener('click', closeModal);
        document.removeEventListener('click', closeModal);
    }
}

/**
 * Открытие модального окна
 * @param evt Событие клика
 * @param modalClass CSS-класс модального окна
 */
const showModal = function (evt, modalClass = 'modal') {
    evt.stopPropagation();
    const modal_view = document.querySelector(`.${modalClass}`);

    // определение зоны за пределами модального окна
    const outer_area = document.querySelectorAll(`.main-container > div:not(.${modalClass})`);

    // поиск кнопки закрытия
    const close_button = modal_view.querySelector('.close-button') ?? null;

    modal_view.classList.remove('modal_closed');
    modal_view.classList.add('modal_opened');

    // блюр всех фоновых элементов
    outer_area.forEach((item) => item.classList.add('blur'));

    // скролл по центру окошка
    modal_view.scrollIntoView({block: "center"});

    // определение способов закрытия модального окна
    document.addEventListener('click', closeModal);
    close_button?.addEventListener('click', closeModal);
}

export { closeModal, showModal };
