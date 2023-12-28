/**
 * Закрытие модального окна
 * @param evt Событие клика (приходит из on:click)
 */
const closeModal = function (evt) {

    // все фоновые элементы
    const blurred = document.querySelectorAll('.blur');

    // открытое модальное окно
    const modal = document.querySelector('.modal_opened');

    // кнопка закрытия модального окна
    let close_button = modal.querySelector('.close-button');

    // проверяет, находится ли событие внутри модального окна
    let in_modal = modal.contains(evt.target);

    if (!in_modal || evt.target === close_button) {

        modal.classList.add('modal_closed');
        modal.classList.remove('modal_opened');

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

    let modalView = document.querySelector(`.${modalClass}`);

    // определение зоны за пределами модального окна
    let outerArea = document.querySelectorAll(`.main-container > div:not(.${modalClass})`);

    // поиск кнопки закрытия
    let closeButton = modalView.querySelector('.close-button') ?? null;

    modalView.classList.remove('modal_closed');
    modalView.classList.add('modal_opened');

    // блюр всех фоновых элементов
    outerArea.forEach((item) => item.classList.add('blur'));

    // скролл по центру окошка
    modalView.scrollIntoView({block: "center"});


    document.addEventListener('click', closeModal);
    closeButton?.addEventListener('click', closeModal);
}

export { closeModal, showModal };