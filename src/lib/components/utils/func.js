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

    // скролл по центру окошка
    modal_view.scrollIntoView({block: "center"});

    // определение способов закрытия модального окна
    document.addEventListener('click', closeModal);
    close_button?.addEventListener('click', closeModal);
}

function randomElements (array, n) {
    return array.sort(() => randomize(0,1)).slice(0, n);
}

/**
 * Получить случайное число в заданном диапозоне
 * @param start
 * @param end
 * @param dotIndex
 * @return {number|string}
 */
export const randomize = (start, end, dotIndex = 0) => {

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
 * Отправка запроса на удаление записи из БД с показом соответствующего сообщения в модальном окне
 * @param category Тип записи | pig | article
 * @param id ID записи
 * @return {boolean} флаг результата
*/
async function removeData(category, id) {
    let success;

    const server_location = /article|news/.test(category) ? 'articles' : 'pigs';

    await fetch(_REMOTE_SERVER + '/' + server_location +'/' + id,
        {
            method: 'DELETE'
        }).then((response) => {
        if (response.ok) {
            success = true;
        }
    }).catch((e) => {
        success = false;
    });

    return success;
}

/**
 * Перенаправление на указанный адрес спустя указанное время;
 * впоследствии лучше использовать для этих целей встроенный свелтовский throw redirect
 * @param url
 * @param delay
 */
export const redirect = function (url, delay) {
    setTimeout(() => goto(url), delay);
}

/**
 * Подгрузка постраничных данных
 * @param data Данные с сервера
 * @param category Категория данных
 * @return Promise Возвращаются только контентные данные (без информации о странице и т.д.); значение получить через вызов с await
 */
export const load_more = async function (data, category) {
    /* При первоначальной загрузке первая партия данных уже загружена,
        поэтому подгрузку следует начинать сразу со второй */
    if (data.pagination.page <= 1) {
        data.pagination.page = 2;
    }

    /* Подгрузка останавливается при достижении последней партии */
    if (data.pagination.page <= data.pagination.pageCount) {

        // Определение адреса подгрузки данных
        let server_location;
        switch (category) {
            default:
                server_location = 'pigs';
                break;
            case 'graduates':
                server_location = 'pigs/graduated';
                break;
            case 'articles':
                server_location = 'articles/type/1';
                break;
            case 'news':
                server_location = 'articles/type/2';
                break;
        }

        const url = `${_REMOTE_SERVER}/${server_location}?page=${data.pagination.page++}`;
        const response = await fetch(url);
        const batch = await response.json();

        return batch.payload;
    }
}

export { closeModal, showModal, randomElements, removeData };
