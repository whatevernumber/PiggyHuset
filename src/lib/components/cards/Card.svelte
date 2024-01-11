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

    export let article = {};
    export let admin = false;
    export let category = 'looking-for-home';
    export let href = `/${category}/${article.id}`;
    export let button_text = 'Подробнее';
    export let default_picture;

    $: image = article.main_photo;
</script>

<article>
    <a {href}>
        <PhotoCard pic={image} photo_type={default_picture} width='250' height='250' alt='Фотография свинки' />
    </a>
    <div class="wrapper">
        <div class='header_wrapper'>
            <a {href}>
                <h3 class="card-title">{article.name ?? article.title}</h3>
            </a>
        {#if admin}
            <div class='button_wrapper'>
                <EditButton button_name='edit' />
                <EditButton button_name='delete' />
            </div>
        {/if}
        </div>
        <p class="card-description">{article.description ?? article.text}</p>
        <div class="bottom-line">
            <Time relative timestamp={article.datetime} />
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

    time {
        font-size: 14px;
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