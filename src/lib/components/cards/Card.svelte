<script>
    import SmolButton from "$lib/components/misc/button/SmolButton.svelte";
    import EditButton from '../misc/button/EditButton.svelte';

    export let article = {};
    export let admin = false;

    $: image = article.image ?? article.type;
</script>

<article>
    <img src="/img/{image}.jpeg" width="250" height="250" alt="Фотография свинки">
    <div class="wrapper">
        <div class='header_wrapper'>
            <h3 class="card-title">{article.title}</h3>
            {#if admin}
            <div class='button_wrapper'>
                <EditButton button_name='edit' />
                <EditButton button_name='delete' />
            </div>
            {/if}
        </div>
        <p class="card-description">{article.text}</p>
        <div class="bottom-line">
            <time datetime="18-11-2023 21:20">18 ноября 2023 21:20</time>
            <SmolButton title="Подробнее" />
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