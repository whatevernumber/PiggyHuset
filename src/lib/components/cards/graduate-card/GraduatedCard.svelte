<script>
    import {_REMOTE_SERVER} from "$env/static/public";
    import {randomize} from "$lib/components/utils/func.js";

    export let name;
    export let placeholder_picture = `vdomike-${randomize(1,3)}`;
    export let img;
    export let src = img ? `${_REMOTE_SERVER}/img/${img}` : `/src/lib/img/placeholder/graduated/${placeholder_picture}.png`;
    export let id = null;
</script>

<div class="graduated_card">
    <a href="{_REMOTE_SERVER + '/graduated/' + id}">
        <img {src} width="248" height="261" alt="Изображение выпускника">
    </a>
    <p class="graduated_name">
        <a href="{_REMOTE_SERVER + '/graduated/' + id}">{name}</a>
    </p>
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
        text-transform: uppercase;
    }
</style>