import { _REMOTE_SERVER } from '$env/static/public';
import {goto} from "$app/navigation";

/**
 * Закрытие модального окна
 * @param evt Событие клика (приходит из on:click)
 */
const closeModal = function (evt) {
    // открытое модальное окно
    const modal = document.querySelector('.modal_opened');

    // проверяет, находится ли событие внутри модального окна
    const in_modal = modal.contains(evt.target);

    const close_button = modal.querySelector('.close-button') ?? null;

    if (!in_modal || evt.target === close_button) {
        modal.classList.add('modal_closed');
        modal.classList.remove('modal_opened');

        const blurred = document.querySelectorAll('.blur'); // все фоновые элементы
        blurred.forEach((item) => item.classList.remove('blur'));

        close_button?.removeEventListener('click', closeModal);
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

function randomElements (array, n) {
    return array.sort(() => .5 - Math.random()).slice(0, n);
}

const randomize = (start, end, dotIndex = 0) => {

    if (start < 0 || end < 0) {
        return 'Отрицательное число!';
    }

    if (end < start) {
        [start, end] = [end, start];
    }

    let result = Math.random() * (end - start) + start;
    result = result.toFixed(dotIndex);
    return Number(result);
};

/**
 * Удаление записи из БД и добавление сообщения в модальное окно
 * @param type Тип записи | pig | article
 * @param id ID записи
 * @param success флаг результата
*/

async function removeData(type, id, success) {
    let message = document.querySelector('.message');
    message.textContent = 'Идёт удаление, подождите...';

    // Прячет кнопки
    document.querySelector('.buttons').style.visibility = 'hidden';
    await fetch(_REMOTE_SERVER + '/' + type +'/' + id,
        {
            method: 'DELETE'
        }).then((response) => {
        if (response.ok) {
            message.textContent = 'Удаление успешно!'
            return success = true;
        }
    }).catch((e) => {
        message.textContent = 'Произошла ошибка. Попробуйте повторить позднее.';
        return success = false;
    });
}

const redirect = function (url, delay) {
    setTimeout(() => goto(url), delay);
}

export { closeModal, showModal, randomElements, randomize, redirect, removeData };
