<script>
    export let src = '../src/lib/img/kb-pig.png';
    export let no_border = false;
    export let no_shadow = false;

    // флаг для класса, отменяющего скругление
    let no_border_radius = false;

    if (!no_border) {
        no_border_radius = true;
    }

</script>

<figure class="photo-wrapper" class:no-border={no_border} class:no-shadow={no_shadow} class:no-border-radius={no_border_radius}>
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

    .no-border-radius img {
        border-radius: 0;
    }

    .no-shadow .photo_main {
        box-shadow: none;
    }

    /* Переопределяет slider-овские настройки для главного слайда */
    .photo_main {
        object-fit: contain;
        object-position: center;
        cursor: grab;
    }

    .photo_main:active {
        cursor: grabbing;
    }

    @media (min-width: 1001px) {
        .photo_main {
            border-radius: 12px;
            box-shadow: 4px 6px 8px 2px rgba(0, 0, 0, 0.2);
        }
    }

    @media (max-width: 1000px) {
        .photo-wrapper {
            height: 300px;
            border: none;
        }
    }
</style>