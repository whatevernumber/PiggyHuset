<script>
    import {_REMOTE_SERVER} from "$env/static/public";
    import {randomize} from "$lib/components/utils/func.js";
    import CloseButton from "$lib/components/misc/button/CloseButton.svelte";

    export let alt = 'Изображение';
	export let pic;
    export let type = 'pig';
    export let src = pic ? `${_REMOTE_SERVER}/img/${pic}` : `../img/placeholder/${type}-${randomize(1, 3)}.png`; // src картинки можно задать явно
    export let is_form = false;
    export let click_handler;
    export let status = null;
    export let width;
    export let height;

    const delete_handler = () => {
        pic = pic;
        click_handler(pic);
    }
</script>

<div class="wrapper" aria-roledescription="Посмотреть фото">
    <div class='image_wrapper'>
        <img {src} class="photo-card" {width} {height} {alt} style="--width: {width || 300}px">

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
        width: var(--width);
        max-height: 250px;
        position: relative;
        object-fit: contain;
        pointer-events: none;
        user-select: none;
    }

    :global(.uploaded_files .photo-card) {
        width: auto;
    }

    :global(.splide__slide .photo-card) {
        width: 244px;
        height: 200px;
        object-fit: cover;
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
        bottom: 3%;
        width: 65px;
        height: 65px;
        background-image: url("/img/found-home.png");
        background-size: cover;
        z-index: 5;

        &.rainbow {
            width: 150px;
            height: 150px;
            right: -10%;
            bottom: -10%;
            background-image: url("/src/lib/img/rainbow.png");
        }

        &.taken {
            width: 200px;
            height: 200px;
            right: -15%;
            bottom: -15%;
            background-image: url("/src/lib/img/taken.png");
        }
    }

    @media (max-width: 1001px) {
        .status {
            bottom: -10%;
        }
    }
</style>
