<script>
    import {_REMOTE_SERVER} from "$env/static/public";
    import {randomize} from "$lib/components/utils/func.js";
    import CloseButton from "$lib/components/misc/button/CloseButton.svelte";

    export let alt = 'Изображение';
	export let pic;
	export let width = 200;
	export let height = 200;
    export let type = 'pig';
    export let src = pic ? `${_REMOTE_SERVER}/img/${pic}` : `../img/placeholder/${type}-${randomize(1, 3)}.png`; // src картинки можно задать явно
    export let is_form = false;
    export let click_handler;
    export let status = null;

    const delete_handler = () => {
        pic = pic;
        click_handler(pic);
    }
</script>

<div class="wrapper" aria-roledescription="Посмотреть фото">
    <div class='image_wrapper'>
        <img {src} class="photo-card" {width} {height} {alt}>

        {#if type === 'ready'}
        <span class="status {status}"></span>
        {/if}

        {#if is_form}
            <CloseButton css_class="delete" click_handler="{delete_handler}" aria_description="Удалить фотографию" box_size="20" />
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
        position: relative;
        object-fit: cover;
        pointer-events: none;
        user-select: none;
    }

    :global(.profile_wrapper .photo-card) {
        box-shadow: 0 0 16px 2px rgba(0, 0, 0, 0.2);
    }

    @media (min-width: 1001px) {
        :global(.profile_wrapper .photo-card) {
            box-shadow: 3px 3px 8px 2px rgba(0, 0, 0, 0.3);
        }
    }

    .status {
        position: absolute;
        right: 0;
        bottom: 2%;
        width: 25%;
        height: 25%;
        background-image: url("/img/found-home.png");
        background-size: cover;
        z-index: 5;

        &.rainbow {
            width: 65%;
            height: 65%;
            right: -15%;
            bottom: -20%;
            background-image: url("/src/lib/img/rainbow.png");
        }

        &.taken {
            width: 85%;
            height: 85%;
            right: -15%;
            bottom: -15%;
            background-image: url("/src/lib/img/taken.png");
        }
    }

    @media (max-width: 1001px) {
        .status.rainbow {
            bottom: -10%;
        }
    }
</style>
