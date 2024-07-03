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

    const server_location = /article|news/.test(category) ? 'articles' : (category === 'food' ? 'info' : 'pigs');

    await fetch('/api/' + server_location + '/delete/?id=' + id,
        {
            method: 'DELETE',
        }).then((response) => {
        success = response.ok;
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

export const load_all = async function (category) {
    // Определение адреса для загрузки данных
    const server_location = define_api(category);

    let query = category === 'graduates' ? '&' : '?';
    query += 'all=1'

    const url = `/api/${server_location}${query}`;
    const response = await fetch(url);
    const batch = await response.json();

    return batch.payload;
};

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
        const server_location = define_api(category);

        let page_query = category === 'graduates' ? '&' : '?';
        page_query += `page=${data.pagination.page++}`;

        const url = `/api/${server_location}${page_query}`;

        const response = await fetch(url);
        const batch = await response.json();

        return batch.payload;
    }
}

/**
 * Определить адрес для обращения к API по категории
 * @param {string} category
 * @return {string}
 */
const define_api = function (category) {
    let server_location;
    switch (category) {
        default:
            server_location = 'pigs/all';
            break;
        case 'graduates':
            server_location = 'pigs/all?graduated=true';
            break;
        case 'articles':
            server_location = 'articles/all';
            break;
        case 'news':
            server_location = 'articles/news/all';
            break;
    }

    return server_location;
};

/**
 * Обернуть HTML Node в указанный тег с возможностью задать класс обёртке
 * @return {*}
 */
export const wrap_element = function (element, tag = 'div', class_name = '') {
    const wrap = document.createElement(tag);
    wrap.classList.add(class_name);

    element.parentNode.insertBefore(wrap, element);

    return wrap.appendChild(element);
}

/**
 * Составить строку с токеном для включения в заголовок Authorization
 * @param key
 * @return {null|string}
 */

/**
 * Проверить, ведёт ли ссылка на внешний ресурс или на страницу в рамках текущего домена
 * @param {string} url
 * @return {boolean}
 */
export const check_link_external = function (url) {
    return new URL(url).origin !== location.origin;
}

export const debounce = function (callback, wait) {
    let timeoutId = null;
    return (...args) => {
        window.clearTimeout(timeoutId);
        timeoutId = window.setTimeout(() => {
            callback(...args);
        }, wait);
    };
}

Array.prototype.sort_by_date = function (param) {
    return this.sort((a, b) => new Date(b[param]) - new Date(a[param]));
}

Array.prototype.sort_by_string = function (param) {
    return this.sort((a, b) => a[param].localeCompare(b[param]));
};

/**
 * Производит сортировку по статусу: статус карантина имеет самое высокое значение,
 * поэтому оказывается в конце отсортированного списка
 * @return {Array}
 */
Array.prototype.sort_by_status = function () {
    return this.sort((a, b) =>  a.status_id - b.status_id)
};

export { closeModal, showModal, randomElements, removeData };
