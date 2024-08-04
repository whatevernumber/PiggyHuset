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
    export let rounded = false;

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

    let text = article.text || article.description || article.info?.desc;

    // удаление тегов с картинками из карточки статьи
    if (type === 'article') {
        text = text.replaceAll(/<img src="\S+" alt="">/g, '');
    }

    if (type !== 'info') {
        text = text.slice(0, 297) + '...' || '';
    }

    let card;
    let innerHtml;

    // отображать ли содержимое как разметку из Quill или как текст
    if (text && text.includes('<p>'))
        innerHtml = text;
    else
        article.description = text;

    // реактивное изменение картинки карточки
    $: image = article.main_photo || (article.image ?? null);

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

    // подстановка [обрезанной] разметки из Quill в текст карточки
    onMount(() => {
        if (innerHtml) card.innerHTML = innerHtml;
    });

</script>

<svelte:window bind:innerWidth={window_width} />

<article class:rounded class="{article?.status_id === 5 || article?.status_id === 6 ? 'unavailable' : ''}" id="{article.id}" data-sveltekit-preload-data="{type === 'article' ? 'hover' : 'tap'}">
    {#if type === 'info'}
        <PhotoCard pic={image} type="food" add_class="product {article.is_banned ? 'banned' : ''}" width="300" height="300"
                   alt='Изображение продукта' />
        {:else}
        <LinkWithReferrer {href} css_class="card-container">
            <PhotoCard pic={image} {type} {status} width="300" height="300"
                       alt={type === 'pig' || type === 'ready' ? 'Фотография свинки' : 'Обложка поста'} />
        </LinkWithReferrer>
    {/if}

    <div class="wrapper {article?.is_banned ? 'banned_wrapper' : ''}">
        <div class="header_wrapper">
            {#if type === 'info'}
                <h3>{article.title}</h3>
            {:else }
            <LinkWithReferrer {href}>
                <h3 class="card-title">{article.name ?? article.title}</h3>
            </LinkWithReferrer>
            {/if}
        {#if admin}
            <div class="button_wrapper">
                <LinkWithReferrer href="{'/admin/edit/' + (type === 'news' ? 'article' : type) + '/' + article.id}">
                    <EditButton button_name="edit" />
                </LinkWithReferrer>
                {#if !(/looking-for-home|graduates/.test(category))}
                <EditButton button_name="delete" click_handler={delete_handler} message_handler={show_delete_message}/>
                {/if}
            </div>
        {/if}
        </div>

        {#if pig_sex}
            <p><b>Пол:</b> {pig_sex}</p>
         {/if}
         {#if city}
            <p><b>Город:</b> {city}</p>
         {/if}

        {#if type === 'info'}
            <div class="card-notices">
            {#if article.info.allowed}
                <p>
                    <span class="details allowed"> Разрешено: </span>
                    {article.info.allowed}
                </p>
            {/if}
            {#if article.info.restrictions}
                <p>
                    <span class="details restricted"> Запрещено: </span>
                    {article.info.restrictions}
                </p>
            {/if}
            </div>
        {/if}

        {#if !article?.is_banned}
            <p class="card-description" bind:this={card}>
                {article.description || ''}
            </p>
        {/if}

        {#if type === 'info'}
            {#if article.is_banned}
                <p class="banned_text">Запрещено давать морским свинкам</p>
            {:else}
            <div class="card-notices">
                {#if article.info.notes}
                    <p>
                        <span class="details note">Примечание: </span>
                        {article.info.notes}
                    </p>
                {/if}
            </div>
            {/if}

        {:else}
            <div class="bottom-line">
                <p class="datetime">
                    <span class="date_word">{date_prefix} </span>
                    <Time relative="{type === 'news'}" format="D MMM YYYYг." live={type === 'news'} timestamp={datetime} /></p>
                <SmolButton title={button_text} {href} />
            </div>
        {/if}
        {#if article.info?.doses && !article?.is_banned}
            <p>
                <span class="details doses">Дозировка: </span>
                {article.info?.doses}
            </p>
        {/if}
    </div>
</article>

<div class="hidden overlay"></div>

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

    .banned_wrapper {
        justify-content: start;
    }

    img {
        object-fit: cover;
    }

    .unavailable {
        opacity: 50%;
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

    .card-notices {
        text-align: left;
        margin-right: 5%;
        display: flex;
        flex-direction: column;
        row-gap: 10px;
    }

    .details {
        font-weight: bold;
    }

    .allowed {
        color: #88aa4d;
    }

    .restricted {
        color: rgba(162, 10, 51, 0.92);
    }

    .note {
        color: #b0bd9a;
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

    .desc {
        font-weight: bold;
    }

    .doses {
        color: #f5b193;
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

    .banned_text {
        margin-top: 12%;
        align-self: center;
        font-size: 24px;
        color: #EF8653;
    }

    @media (max-width: 1001px) {
        article {
            flex-direction: column;
            row-gap: 10px;
        }

        article.rounded {
            border-radius: 25px;
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

        .banned_text {
            margin-top: 10px;
        }
    }
</style>