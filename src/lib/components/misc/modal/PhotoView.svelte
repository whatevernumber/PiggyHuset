<script>
    export let src = '../src/lib/img/kb-pig.png';
    export let no_border = false;

</script>

<figure class="photo-wrapper {no_border ? 'no-border' : ''}">
    <img class='photo_main' {src} width='700' height='600' alt="Фотография свинки">
</figure>

<style>
    .photo-wrapper {
        margin: auto;
        width: fit-content;
        height: 500px;
        border: 3px #e1edce solid;
    }

    img {
        width: 100%;
        height: 100%;
    }

    .no-border {
        border: none;
    }

    /* Переопределяет slider-овские настройки для главного слайда */
    .photo_main {
        object-fit: contain;
        object-position: center;
    }

    @media (max-width: 1000px) {
        .photo-wrapper {
            width: 400px;
            height: 300px;
            border: none;
        }
    }
</style>