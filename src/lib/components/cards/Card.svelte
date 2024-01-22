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

    export let admin;
    export let article = {}; // Данные для показа в карточке
    export let category; // Категория (для автоматического составления URL)
    export let href = `/${category}/${article.id}`; // Можно задать URL вручную
    export let button_text = 'Подробнее'; // Текст кнопки
    export let type; // Тип карточки для автоматической подстановки плейсхолдер-картинки
    export let delete_handler;
    export let id;

    export let action;
    export let success;

    $: image = article.main_photo ?? null;

    const show_delete_message = () => {
        id = article.id;
        document.querySelector('.message').innerHTML = `Вы собираетесь удалить запись "${(article.name ?? article.title)}". Это действие <b>необратимо</b>`;
    }
</script>

<article>
    <a {href}>
        <PhotoCard pic={image} {type} width='250' height='250' alt='Фотография свинки' />
    </a>
    <div class="wrapper">
        <div class='header_wrapper'>
            <a {href}>
                <h3 class="card-title">{article.name ?? article.title}</h3>
            </a>
        {#if admin}
            <div class='button_wrapper'>
                <EditButton button_name='edit' />
                {#if !(/pigs|graduates/.test(category))}
                <EditButton button_name='delete' click_handler={delete_handler} message_handler={show_delete_message}/>
                {/if}
            </div>
        {/if}
        </div>
        <p class="card-description">{article.description ?? article.text}</p>
        <div class="bottom-line">
            <p class="datetime">Опубликовано: <Time relative timestamp={article.datetime} /></p>
            <SmolButton title={button_text} {href} />
        </div>
    </div>
</article>

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

    .bottom-line {
        display: flex;
        justify-content: space-between;
    }

    .datetime {
        font-size: 15px;
        font-style: italic;
        color: rgba(0, 0, 0, 0.5);
        align-self: flex-end;
    }

    .header_wrapper {
        display: flex;
    }

    .button_wrapper {
        margin-left: auto;
        display: flex;
        max-width: 100px;
        column-gap: 5px;
    }
</style>