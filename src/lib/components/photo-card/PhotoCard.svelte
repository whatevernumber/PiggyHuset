<script>
    import {_REMOTE_SERVER} from "$env/static/public";
    import {randomize} from "$lib/components/utils/func.js";
    import CloseButton from "$lib/components/misc/button/CloseButton.svelte";

    export let alt = 'Изображение';
    export let type = 'pig';
	export let pic;
    export let src = (`../img/placeholder/${type}-${randomize(1, 3)}.png`); // src картинки можно задать явно
    export let is_form = false;
    export let click_handler;
    export let status = null;
    export let width;
    export let height;
    export let add_class;

    export let main_photo; // индекс новой фотографии, отмечанной основной
    export let old_photo_name; // название старой фотографии, отмечанной основной
    export let index; // индекс добавленной новой фотографии

    export let form_photo_type; // тип превью фотографий для формы (новый\старые)

    if (pic) {
        src = `${_REMOTE_SERVER}/img/` + (type === 'food' ? `/info/${pic}` : `${pic}`);
    }

    const delete_handler = () => {
        click_handler(pic);
    }

    // отмечает фотографию главной (для форм)
    const mark_photo_as_main = () => {

        if (form_photo_type === 'new') {

            // Снять выбор из списка старых фотографий
            old_photo_name = null;

            // Если текущая фотография уже выбрана, снять выбор, в ином случае отметить выбранной
            main_photo === index ? null : main_photo = index;
        }


        if (form_photo_type === 'old') {

            // Снять выбор из списка новых фотографий
            main_photo = null;

            // Если текущая фотография уже выбрана, снять выбор, в ином случае отметить выбранной
            old_photo_name === pic ? null : old_photo_name = pic;
        }
    }

</script>

<div class="wrapper" aria-roledescription="Посмотреть фото" on:click={ (form_photo_type === 'old' || form_photo_type === 'new') ? mark_photo_as_main : null}>
    <div class='image_wrapper'>
        <img {src} class="photo-card {add_class}" class:marked={ old_photo_name && old_photo_name === pic || form_photo_type === 'new' && main_photo === index } {width} {height} {alt} style="--width: {width || 300}px">

        {#if type === 'ready' || status === 'quarantine' || status === 'banned'}
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
        padding: 2px;
        position: relative;
        object-fit: contain;
        pointer-events: none;
        user-select: none;
    }

    .photo-card.product {
        object-fit: cover;
    }

    .product.banned {
        outline: red solid 4px;
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
    }

    .status.rainbow {
        width: 150px;
        height: 150px;
        right: -10%;
        bottom: -10%;
        background-image: url("/src/lib/img/rainbow.png");
    }

    .status.taken {
        width: 200px;
        height: 200px;
        right: -15%;
        bottom: -15%;
        background-image: url("/src/lib/img/taken.png");
    }

    .status.quarantine {
        width: 120px;
        height: 120px;
        right: -5%;
        bottom: -10%;
        background-image: url("/src/lib/img/quarantine.png");
    }

    .status.banned {
        width: 60px;
        height: 60px;
        right: 5%;
        top: 5%;
        background-image: url("/src/lib/img/restricted.png");
    }

    .marked {
        outline: 3px solid #F6B5D3;
        box-shadow: 6px 6px 10px #3f3f3f;
    }

    @media (max-width: 1001px) {
        .status {
            bottom: -10%;
        }
    }
</style>
