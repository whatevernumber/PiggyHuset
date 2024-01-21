<script>
    import {page} from "$app/stores";
</script>

<svelte:head>
    <title>Упс! Ошибка {$page.status}</title>
</svelte:head>

<section>
    <h1 class="extra-big-header">
        Упс!
    </h1>

    <p>
        <b>({$page.status}) {$page.error.message}</b>: Такой страницы не существует или что-то пошло не так!
    </p>

    <img class="error-image" src="/img/error.jpeg" width="350" height="350" alt="Пиксельное изображение свинки">

    <a class="home-link" href="/">
        Назад на главную
    </a>
</section>

<style>

    section {
        min-height: 100%;
        padding: 0 25%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        row-gap: 50px;
        background-image: url("/img/404.png");
        background-repeat: no-repeat;
        background-size: contain;
        background-position-y: 50%;
    }

    .extra-big-header {
        padding-top: 50px;
        font-size: 68px;
        font-weight: 700;
        line-height: 100%;
    }

    .error-image {
        margin-top: 32px;
    }

    .home-link {
        font-size: 32px;
        font-weight: 400;
        text-transform: uppercase;
    }

    .home-link:hover {
        color: #EF8653;
    }

    p {
        font-size: 18px;
    }

</style>