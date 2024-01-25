<script>
    import BigHeader from "$lib/components/misc/h-headers/BigHeader.svelte";
    import CardList from "$lib/components/lists/CardList.svelte";
    import Card from "$lib/components/cards/Card.svelte";
    import {closeModal, load_more, removeData, showModal} from '$lib/components/utils/func.js';
    import ModalOkay from '$lib/components/misc/modal/ModalOkay.svelte';
    import {onMount} from "svelte";

    export let admin;
    export let button_text; // Текст кнопки
    export let category; // Категория (для автоматического составления URL)
    export let data = {};
    export let default_text = 'Ищет самые лучшие ручки на свете';
    export let page_title = ''; // Заголовок страницы каталога
    export let type; // Тип карточки для автоматической подстановки плейсхолдер-картинки

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
    }

    async function remove () {
        let message = document.querySelector('.message');
        message.textContent = 'Идёт удаление, подождите...';

        success = await removeData(category, action_id);
        if (success) {
            action = 'complete';
            const index = data_array.findIndex(a => a.id === action_id);
            data_array.splice(index, 1);
            data_array = data_array;
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

    // реактивное обновление списка
    $: data_array = new_batch ? [
        ...data_array,
        ...new_batch
    ] : data_array;

</script>
<div>
    <section id="catalog">
        <div class="section-wrapper">

            <BigHeader text_content="{page_title}" position="left"/>

            <CardList>
                {#each data_array as article}
                    <li>
                        <Card {article} {type} {category} {button_text} {admin} delete_handler={show_delete} bind:id={action_id}/>
                    </li>
                {/each}
            </CardList>
        </div>
    </section>
</div>

<div class='modal modal_closed'>
    <ModalOkay {action} {success} action_handler={remove}/>
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
    }

    .modal_closed {
        display: none;
    }
</style>