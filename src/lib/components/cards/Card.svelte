<script>
    import SmolButton from "$lib/components/misc/button/SmolButton.svelte";

    export let article = [];
    export let image = article.image ?? article.type;
</script>

<article>
    <img src="/img/{image}.jpeg" width="250" height="250" alt="Фотография свинки">
    <div class="wrapper">
        <h3 class="card-title">{article.title}</h3>
        <p class="card-description">{article.text}</p>
        <SmolButton title="Подробнее" />
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
</style>