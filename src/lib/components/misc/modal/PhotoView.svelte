<script>
    export let src = '../src/lib/img/kb-pig.png';
    export let no_border = false;

</script>

<figure class="photo-wrapper {no_border ? 'no-border' : ''}">
    <img {src} width="900" height="900" alt="Фотография свинки">
</figure>

<style>
    .photo-wrapper {
        margin: auto;
        width: 700px;
        height: 600px;
        border: 3px #e1edce solid;
    }

    img {
        width: 100%;
        height: 90%;
    }

    .no-border {
        border: none;
    }
</style>