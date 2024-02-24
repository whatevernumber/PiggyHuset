<script context="module">
    import { dayjs } from "svelte-time"
    import "dayjs/locale/ru";
    dayjs.locale('ru')
</script>

<script>
    import Time from "svelte-time";
    import SmolButton from "$lib/components/misc/button/SmolButton.svelte";
    import EditButton from "$lib/components/misc/button/EditButton.svelte";
    import PhotoCard from '$lib/components/photo-card/PhotoCard.svelte';
    import {onMount} from "svelte";
    import { redirect } from '$lib/components/utils/func.js';

    export let admin;
    export let article = {}; // Данные для показа в карточке
    export let category; // Категория (для автоматического составления URL)
    export let href = `/${category}/${article.id}`; // Можно задать URL вручную
    export let button_text = 'Подробнее'; // Текст кнопки
    export let type; // Тип карточки для автоматической подстановки плейсхолдер-картинки
    export let delete_handler;
    export let id;
    export let action;
    let status; // для отображения иконки статуса выпусника.

    if (type === 'ready') {
        switch (article.status_id) {
            case 3:
                status = 'rainbow';
                break;
            case 4:
                status = 'taken';
                break;
        }
    }

    let text = article.text || article.description;

    // удаление тегов с картинками из карточки статьи
    if (type === 'article') {
        text = text.replaceAll(/<img src="\S+" alt="">/g, '');
    }

    // подрезка текста до 300 символов, если текст длиннее заданного лимита
    text = text.length > 300 ? text.slice(0, 297) + '...' : text;

    let card;
    let innerHtml;

    // отображать ли содержимое как текст или как разметку из Quill
    text && text.includes('<p>') ?
        innerHtml = text :
        article.description = text;

    // реактивное изменение картинки карточки
    $: image = article.main_photo ?? null;

    let window_width = 0;
    let date_word = '';

    $: if (window_width < 1000 && window_width !== 0) {
        date_word = '';
    } else {
        date_word = 'Опубликовано: '
    }

    const show_delete_message = () => {

        // для получения id-значения конкретной карточки
        id = article.id;
        document.querySelector('.message').innerHTML = `Вы собираетесь удалить запись "${(article.name ?? article.title)}". Это действие <b>необратимо</b>`;
    }

    const redirect_to_edit = () => {

        // для получения id-значения конкретной карточки
        id = article.id;

        if (type === 'ready') {
            type = 'pig';
        } else if (type === 'news') {
            type = 'article';
        }

        redirect('/admin/edit/' + type + '/' + id, 250);
    }

    // подстановка [обрезанной] разметки из Quill в текст карточки
    onMount(() => {
        if (type === 'article') {
            innerHtml !== undefined ? card.innerHTML = innerHtml : null;
        }
    });
</script>

<svelte:window bind:innerWidth={window_width} />

<article data-sveltekit-preload-data="{type === 'article' ? 'hover' : 'tap'}">
    <a {href}>
        <PhotoCard pic={image} {type} {status} width='250' height='250' alt='Фотография свинки' />
    </a>
    <div class="wrapper">
        <div class='header_wrapper'>
            <a {href}>
                <h3 class="card-title">{article.name ?? article.title}</h3>
            </a>
        {#if admin}
            <div class='button_wrapper'>
                <EditButton button_name='edit' click_handler={redirect_to_edit}/>
                {#if !(/looking-for-home|graduates/.test(category))}
                <EditButton button_name='delete' click_handler={delete_handler} message_handler={show_delete_message}/>
                {/if}
            </div>
        {/if}
        </div>
        <p class="card-description" bind:this={card}>{article.description || ''}</p>
        <div class="bottom-line">
            <p class="datetime">{date_word}<Time relative timestamp={article.datetime} /></p>
            <SmolButton title={button_text} {href} />
        </div>
    </div>
</article>
<div class='hidden overlay'></div>

<style>
    article {
        display: flex;
        column-gap: 25px;
        padding: 19px;
        background-color: #FFFFFF;
        border: 1px solid rgba(0, 0, 0, 0.1);
    }

    .wrapper {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        justify-content: space-around;
    }

    img {
        object-fit: cover;
    }

    .card-title {
        padding: 0;
        font-size: 24px;
        line-height: 130%;
    }

    .card-title:hover {
        color: #d97544;
    }

    .card-description {
        font-size: 16px;
        line-height: 140%;
        color: #333333;
    }

    :global(.card-description a) {
        color: #88aa4d;
    }

    :global(.card-description img) {
        display: none;
    }

    .bottom-line {
        display: flex;
        justify-content: space-between;

        @media(max-width: 1179px) {
            flex-wrap: wrap;
        }
    }

    .datetime {
        font-size: 15px;
        font-style: italic;
        color: rgba(0, 0, 0, 0.5);
        align-self: flex-end;
    }

    .header_wrapper {
        display: flex;
        margin-bottom: 10px;
    }

    .button_wrapper {
        margin-left: auto;
        display: flex;
        max-width: 100px;
        column-gap: 5px;
    }

    @media (max-width: 1001px) {
        article {
            flex-direction: column;
            row-gap: 10px;
        }

        .wrapper {
            row-gap: 10px;
        }

        .bottom-line {
            column-gap: 5px;
        }

        .datetime {
            order: 15;
            text-align: right;
        }
    }
</style>