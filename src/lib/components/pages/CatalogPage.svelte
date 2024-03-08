<script>
    import BigHeader from "$lib/components/misc/h-headers/BigHeader.svelte";
    import CardList from "$lib/components/lists/CardList.svelte";
    import Card from "$lib/components/cards/Card.svelte";
    import {closeModal, load_more, removeData, showModal} from '$lib/components/utils/func.js';
    import ModalOkay from '$lib/components/misc/modal/ModalOkay.svelte';
    import {onMount} from "svelte";
    import {fly} from "svelte/transition";
    import { afterNavigate } from '$app/navigation';
    import SortButton from "$lib/components/misc/button/SortButton.svelte";
    import FilterList from "$lib/components/lists/FilterList.svelte";

    export let admin;
    export let button_text; // Текст кнопки
    export let category; // Категория (для автоматического составления URL)
    export let data = {};
    export let page_title = ''; // Заголовок страницы каталога
    export let type; // Тип карточки для автоматической подстановки плейсхолдер-картинки
    export let modal_opened; // Флаг для открытия оверлея

    let data_array = data.payload;
    let action_id;
    let new_batch = [];
    let action = '';
    let success;

    let original_data = data_array;

    const is_article = (type === 'article' || type === 'news');

    const show_delete = (evt) => {
        action = 'delete';
        showModal(evt);
        evt.target.removeEventListener('click', show_delete);
        document.removeEventListener('click', closeModal);

        modal_opened = true;
    }

    // Обработка действия кнопки "отменить" при удалении
    const handle_cancel = (evt) => {
        closeModal(evt);
        modal_opened = false;
    }

    async function remove () {
        let message = document.querySelector('.message');
        message.textContent = 'Идёт удаление, подождите...';

        success = removeData(category, action_id);
        if (success) {
            action = 'complete';
            data_array = data_array.filter(i => i.id !== action_id);
            message.textContent = 'Удаление успешно!';
        } else {
            action = 'fail';
            message.textContent = 'Произошла ошибка. Попробуйте повторить позднее.';
        }
    }

    let sorted = {
        param: 'datetime',
        type: 'asc'
    };

    /**
     * Сортировка списка
     * @param param
     * @param evt
     * @return void
     */
    const sort_by = function (param, evt) {
        if (sorted.param !== param) {
            data_array = param === 'datetime' ? data_array.sort_by_date(param) : data_array.sort_by_string(param);
            sorted.param = param;
            evt.target.classList.add('up');
            evt.target.previousElementSibling?.classList.remove('up', 'down');
            evt.target.nextElementSibling?.classList.remove('up', 'down');
        } else {
            if (sorted.type === 'desc') {
                sorted.type = 'asc';
                evt.target.classList.toggle('down');
                evt.target.classList.toggle('up');
            } else {
                sorted.type = 'desc';
                evt.target.classList.toggle('up');
                evt.target.classList.toggle('down');
            }
            data_array = data_array.reverse();
        }
    }

    let active_filters = [];

    const add_to_filter = function (evt) {
        const label = evt.target.parentElement;
        label.classList.toggle('checked');

        // убрать из массива фильтров, если он уже там
        if (active_filters.includes(evt.target.value)) {
            active_filters.splice(active_filters.indexOf(evt.target.value), 1)
        } else {
            active_filters.push(evt.target.value);
        }

        // запустить фильтрацию
        filter();
    }

    /**
     * Фильтрация по массиву active_filters: карточке добавляется фильтр для скрытия
     * @return void
     */
    const filter = function () {
        data_array.map(
            (el) => {
                let node = document.getElementById(el.id);

                // если чекнули хотя бы один фильтр
                if (active_filters.length) {
                    const city_match = active_filters.includes(el.city.city_name);
                    const overseer_match = active_filters.includes(el.overseer?.overseer_name);
                    const filter_by_overseer = active_filters.some(f => f.includes('Домик') || f.includes('Куратор'));
                    const filter_by_city = active_filters.some(f => !f.includes('Домик') && !f.includes('Куратор'));

                    // если чекнуты город и куратор / куратор без города / город без куратора
                    if (
                        filter_by_overseer && ((city_match && overseer_match)
                        || (!filter_by_city && overseer_match))
                        || !filter_by_overseer && (city_match || overseer_match)
                    ) {
                        node.parentElement.classList.remove('filtered');
                    } else {
                        node.parentElement.classList.add('filtered');
                    }
                } else {
                    // если все фильтры сняты, отобразить все элементы
                    node.parentElement.classList.remove('filtered');
                }
            }
        );
    }

    onMount(
        () => document.addEventListener('scroll', async function () {
            const bottom_reached = window.scrollY + window.innerHeight >= (document.body.scrollHeight - 5);
            if (bottom_reached) {
                new_batch = await load_more(data, category);
            }
        })
    );

    afterNavigate(() => sessionStorage.removeItem('referrer'));

    // реактивное обновление списка
    $: data_array = new_batch ? [
        ...data_array,
        ...new_batch
    ] : data_array;

</script>

<div in:fly={admin ? {duration: 600, y: 1200} : {duration: 600, delay: 0, x: -800}}>
    <section id="catalog">
        <div class="section-wrapper">

            <BigHeader text_content="{page_title}" position="left"/>

            <div class="sorting">
                <p class="by_{sorted.param}">
                    <SortButton title="{is_article ? 'По названию' : 'По именам'}" click_handler={(evt) => sort_by(data_array[0].hasOwnProperty('name') ? 'name' : 'title', evt)} />
                    <SortButton class_name="up" title="{is_article ? 'По дате публикации' : 'По дате поступления'}" click_handler={(evt) => sort_by('datetime', evt)} />
                </p>
            </div>

            {#if type === 'pig' || type === 'ready'}
            <div class="filtering">
                <FilterList data="{data_array}" filter_handler="{add_to_filter}" />
            </div>
            {/if}

            <CardList>
                {#each data_array as article (article.id)}
                    <li>
                        <Card {article} {type} {category} {button_text} {admin} delete_handler={show_delete} bind:id={action_id}/>
                    </li>
                {/each}
            </CardList>

        </div>
    </section>
</div>

<div class='modal modal_closed'>
    <ModalOkay {action} {success} {handle_cancel} action_handler={remove} bind:modal_opened={modal_opened} />
</div>

<style>
    section {
        min-height: 100%;
        padding: 0 25%;
        background-color: aliceblue;
    }

    .section-wrapper {
        min-height: 100%;
        padding: 40px 5%;
        position: relative;
    }

    :global(li.filtered) {
        display: none;
    }

    .sorting {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        margin-bottom: 5%;
    }

    .filtering {
        height: 400px;
        position: absolute;
        top: 210px;
        left: -22vw;
        padding: 3%;
        background-color: #FFFFFF;
        border: 1px solid rgba(0, 0, 0, 0.1);
        overflow: auto;
        box-shadow: 6px 6px 8px 2px rgba(0, 0, 0, 0.1);
    }

    .modal {
        position: fixed;
        top: 35%;
        left: 30%;
        z-index: 3;
    }

    .modal_closed {
        display: none;
    }

    .hidden {
        display: none;
    }

    @media (max-width: 1001px) {
        section {
            padding: 0;
        }

        .modal {
            left: 0;
        }

        .filtering {
            position: static;
            height: 180px;
            margin-bottom: 5vw;
            padding: 3% 5%;
        }
    }

    @media (min-width: 1200px) {
        .filtering {
            width: 16vw;
        }
    }
</style>