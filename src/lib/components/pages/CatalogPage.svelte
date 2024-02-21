<script>
    import BigHeader from "$lib/components/misc/h-headers/BigHeader.svelte";
    import CardList from "$lib/components/lists/CardList.svelte";
    import Card from "$lib/components/cards/Card.svelte";
    import {closeModal, load_more, removeData, showModal} from '$lib/components/utils/func.js';
    import ModalOkay from '$lib/components/misc/modal/ModalOkay.svelte';
    import {onMount} from "svelte";
    import {fly} from "svelte/transition";
    import { afterNavigate, beforeNavigate, goto } from '$app/navigation';
    import {page} from "$app/stores";

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

    onMount(
        () => document.addEventListener('scroll', async function () {
            const bottom_reached = window.scrollY + window.innerHeight >= (document.body.scrollHeight - 5);
            if (bottom_reached) {
                new_batch = await load_more(data, category);
            }
        })
    )

    beforeNavigate(() => {
        sessionStorage.setItem('referrer', $page.url.href);
    })

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
    }
</style>