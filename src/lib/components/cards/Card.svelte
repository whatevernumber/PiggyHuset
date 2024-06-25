<script context="module">
    import { dayjs } from "svelte-time"
    import "dayjs/locale/ru";
    dayjs.locale('ru');
    import utc from "dayjs/plugin/utc.js";
    import tz from "dayjs/plugin/timezone.js";

    dayjs.extend(utc);
    dayjs.extend(tz);

    const timezone = dayjs.tz.guess();
</script>

<script>
    import Time from "svelte-time";
    import SmolButton from "$lib/components/misc/button/SmolButton.svelte";
    import EditButton from "$lib/components/misc/button/EditButton.svelte";
    import PhotoCard from '$lib/components/photo-card/PhotoCard.svelte';
    import {onMount} from "svelte";
    import { redirect } from '$lib/components/utils/func.js';
    import LinkWithReferrer from "$lib/components/misc/links/LinkWithReferrer.svelte";

    export let admin;
    export let article = {}; // Данные для показа в карточке
    export let category; // Категория (для автоматического составления URL)
    export let href = `/${category}/${article.id}`; // Можно задать URL вручную
    export let button_text = 'Подробнее'; // Текст кнопки
    export let type; // Тип карточки для автоматической подстановки плейсхолдер-картинки
    export let delete_handler;
    export let id;
    export let action;
    export let desc; // для показа текста модального окна при удалении

    let date = article.graduation_date ? article.graduation_date : article.datetime;
    const datetime = dayjs.utc(date).tz(timezone);

    let status; // для отображения иконки статуса выпусника.
    let city = article.city ? article.city.city_name : null;
    let pig_sex = article.sex ? article.sex : null;

    if (pig_sex) {
        pig_sex = (pig_sex === 'F') ? 'Девочка' : 'Мальчик';
    }

    if (type === 'ready' || type === 'pig') {
        switch (article.status_id) {
            case 3:
                status = 'rainbow';
                break;
            case 4:
                status = 'taken';
                break;
            case 6:
                status = 'quarantine';
                break;
        }
    }

    let text = article.text || article.description;

    // удаление тегов с картинками из карточки статьи
    if (type === 'article') {
        text = text.replaceAll(/<img src="\S+" alt="">/g, '');
    }

    text = text.slice(0, 297) + '...' || '';

    let card;
    let innerHtml;

    // отображать ли содержимое как разметку из Quill или как текст
    if (text && text.includes('<p>'))
        innerHtml = text;
    else
        article.description = text;

    // реактивное изменение картинки карточки
    $: image = article.main_photo ?? null;

    let window_width = 0;
    let date_prefix = '';

    $: if (window_width > 1000) {
        switch (article.status_id) {
            case 1:
                date_prefix = (pig_sex === 'Мальчик' ? 'поступил' : 'поступила') + ' в Домик';
                break;
            case 2:
                date_prefix = (pig_sex === 'Мальчик' ? 'нашёл' : 'нашла') + ' дом';
                break;
            case 3:
                date_prefix = (pig_sex === 'Мальчик' ? 'убежал' : 'убежала') + ' на Радугу';
                break;
            default:
                date_prefix = article?.status?.text || 'Опубликовано';
        }

        date_prefix = date_prefix + ':'
    }

    const show_delete_message = () => {

        // для получения id-значения конкретной карточки
        id = article.id;
        desc = `Вы собираетесь удалить запись "${(article.name ?? article.title)}". Это действие необратимо`;
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

<article id="{article.id}" data-sveltekit-preload-data="{type === 'article' ? 'hover' : 'tap'}">
    <LinkWithReferrer {href} css_class="card-container">
        <PhotoCard pic={image} {type} {status} width="300" height="300" alt='Фотография свинки' />
    </LinkWithReferrer>
    <div class="wrapper">
        <div class='header_wrapper'>
            <LinkWithReferrer {href}>
                <h3 class="card-title">{article.name ?? article.title}</h3>
            </LinkWithReferrer>
        {#if admin}
            <div class='button_wrapper'>
                <EditButton button_name='edit' click_handler={redirect_to_edit}/>
                {#if !(/looking-for-home|graduates/.test(category))}
                <EditButton button_name='delete' click_handler={delete_handler} message_handler={show_delete_message}/>
                {/if}
            </div>
        {/if}
        </div>
            {#if pig_sex}
        <p class="info pig_city"><b>Пол:</b> {pig_sex}</p>
             {/if}
             {#if city}
        <p class="info pig_city"><b>Город:</b> {city}</p>
             {/if}
        <p class="card-description" bind:this={card}>{article.description || ''}</p>
        <div class="bottom-line">
            <p class="datetime">
                <span class='date_word'>{date_prefix} </span>
                <Time relative="{type === 'news'}" format="D MMM YYYYг." live={type === 'news'} timestamp={datetime} /></p>
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
        box-shadow: 3px 8px 8px 2px rgba(0, 0, 0, 0.1);
    }

    @media (min-width: 1001px) and (max-width: 1441px) {
        article {
            width: 60vw;
        }
    }

    .wrapper {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        justify-content: space-around;
        row-gap: 10px;
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
        column-gap: 5px;
    }

    @media(max-width: 1179px) {
        .bottom-line {
            flex-wrap: wrap;
        }
    }

    .datetime {
        align-self: flex-end;
        display: flex;
        column-gap: 5px;
        flex-wrap: wrap;
        font-size: 15px;
        font-style: italic;
        color: rgba(0, 0, 0, 0.5);
    }

    .datetime:first-letter {
        text-transform: capitalize;
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