/**
 * Закрытие модального окна
 * @param evt Событие клика (приходит из on:click)
 */
const closeModal = function (evt) {
    // все фоновые элементы
    const blurred = document.querySelectorAll('.blur');

    if (blurred && !evt.target.classList.contains('.modal') ) {
        let modal = document.querySelector('.modal_opened'); // открытое модальное окно

        modal.classList.add('modal_closed');
        modal.classList.remove('modal_opened');

        blurred.forEach((item) => item.classList.remove('blur'));

        evt.target.removeEventListener('click', closeModal);
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

    // определение способов закрытия модального окна
    outerArea.forEach(item => item.addEventListener('click', closeModal));
    closeButton?.addEventListener('click', closeModal);
}

export { closeModal, showModal };