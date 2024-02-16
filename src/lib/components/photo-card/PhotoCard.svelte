<script>
    import {_REMOTE_SERVER} from "$env/static/public";
    import {randomize} from "$lib/components/utils/func.js";

    export let alt = 'Изображение';
	export let pic;
	export let width = 200;
	export let height = 200;
    export let type = 'pig';
    export let src = pic ? `${_REMOTE_SERVER}/img/${pic}` : `../img/placeholder/${type}-${randomize(1, 3)}.png`; // src картинки можно задать явно
    export let is_form = false;
    export let click_handler;

    const delete_handler = () => {
        pic = pic;
        click_handler(pic);
    }

</script>

<div class="wrapper" aria-roledescription="Посмотреть фото">
    <div class='image_wrapper'>
        <img {src} class="photo-card" {width} {height} {alt}>
        {#if is_form}
            <div class='cancel_button' on:click={delete_handler} role="button" tabindex="0"></div>
        {/if}
    </div>
</div>

<style>
    .wrapper {
        display: flex;
        justify-content: center;
        flex-grow: revert;
    }

    .image_wrapper {
        position: relative;
    }

    .photo-card {
        object-fit: cover;
        pointer-events: none;
    }

    .cancel_button {
        width: 20px;
        height: 20px;
        top: 0;
        right: -20px;
        background-image: url("/src/lib/img/x.png");
        background-size: contain;
        background-repeat: no-repeat;
        position: absolute;
    }

    .cancel_button:hover {
        width: 25px;
        height: 28px;
        right: -17px;
        background-image: url("/src/lib/img/x.png");
        background-size: contain;
        background-repeat: no-repeat;
    }

</style>
