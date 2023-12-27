<script>
    export let src = '';
</script>

<div class="photo-view-modal modal_closed modal">
    <figure class="photo-wrapper">
        <img {src} width="900" height="900" alt="Фотография свинки">
        <button class="close-button">Закрыть</button>
    </figure>
</div>

<style>
    .photo-wrapper {
        position: absolute;
        margin: auto;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        width: 700px;
        height: 670px;
        border: 3px #88aa4d solid;
        box-shadow: 0 0 6px 42px #FFFFFF;
    }

    img {
        width: 100%;
        height: 100%;
    }

    .close-button {
        border: none;
        padding: 2px 10px;
        position: absolute;
        bottom: 3%;
        right: 3%;
        background-color: #88aa4d;
        font-family: Jost, Arial, sans-serif;
        font-size: 18px;
        color: #FFFFFF;
        opacity: 0.45;
    }

    .close-button:hover {
        opacity: 1;
        color: #F0F8FF;
    }

    .close-button:active,
    .close-button:focus {
        border: 1px #FFFFFF solid;
    }
</style>