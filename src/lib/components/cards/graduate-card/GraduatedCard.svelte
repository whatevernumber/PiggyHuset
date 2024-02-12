<script>
    import {_REMOTE_SERVER} from "$env/static/public";
    import {randomize} from "$lib/components/utils/func.js";

    export let name;
    export let placeholder_picture = `vdomike-${randomize(1,3)}`;
    export let img;
    export let src = img ? `${_REMOTE_SERVER}/img/${img}` : `/img/placeholder/graduated/${placeholder_picture}.png`;
    export let id = null;
</script>

<div class="graduated_card">
    <a href="{_REMOTE_SERVER + '/graduated/' + id}">
        <img {src} width="248" height="261" alt="Изображение выпускника">
    </a>
    <a href="{'/graduates/' + id}">
        <p class="graduated_name">{name}</p>
    </a>
</div>

<style>
    .graduated_card {
        min-height: 290px;
        width: 254px;
        padding: 20px;
        border: 1px solid rgba(0, 0, 0, 0.10);
        display: flex;
        flex-direction: column;
        row-gap: 10px;
    }

    .graduated_name {
        padding: 5%;
        background-color: #D97544;
        color: #FFFFFF;
        font-weight: 500;
        text-align: center;
        text-transform: uppercase;
    }

    .graduated_card img {
        border: 2px dashed #D97544;
        background-color: #f0f8ff;
        object-fit: cover;
    }
</style>