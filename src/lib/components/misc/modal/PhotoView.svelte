<script>
    export let src = '';
    export let no_border = false;
</script>

<figure class="photo-wrapper {no_border ? 'no-border' : ''}">
    <img {src} width="900" height="900" alt="Фотография свинки">
</figure>

<style>
    .photo-wrapper {
        margin: auto;
        width: 500px;
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
</style>