<script>
    export let class_name = '';
    export let title;
    export let href;
    export let external = false;
    export let background_color;
    export let text_color;
    export let icon = 'button-icon-happy-pig.png';
    export let onclick;

    let background_img = "url('/img/" + icon + "')";

    function hover() {
        const images = document.querySelectorAll('.animate_pig');
        images.forEach((image) => image.setAttribute('src', '/img/modal_hover.gif'))
    }

    function unhover() {
        const images = document.querySelectorAll('.animate_pig');
        images.forEach((image) => image.setAttribute('src', '/img/modal_unhover.gif'))
    }

    function wheek() {
        const images = document.querySelectorAll('.animate_pig');
        images.forEach((image) => image.setAttribute('src', '/img/modal_click.gif'))
    }

    function handle (evt) {
        setTimeout(() => {onclick(evt)}, 600);
    }

</script>

<div class='button_container'>
    <a class="button {class_name}" {href} target="{external ? '_blank' : ''}" style="--background_color: {background_color}; --background_img: {background_img};
        --text-color: {text_color}"
                on:click={handle} on:click={wheek}
                on:mouseover={hover} on:mouseout={unhover} >
        {title}
    </a>

    {#if class_name.includes('modal_button')}
        <img class='animate_pig image_right' width='60px' height='60px' src='/img/modal_okay_main.jpg'>
        <img class='animate_pig image_left' width='60px' height='60px' src='/img/modal_okay_main.jpg'>
    {/if}
</div>

<style>
    .button {
        position: relative;
        padding: 17.3px 80px;
        max-width: 180px;
        text-align: center;
        text-transform: uppercase;
        font-size: 18px;
        font-style: normal;
        font-weight: 400;
        line-height: 140%;
        color: var(--text-color);
        background-color: var(--background_color);
        border: 1px solid #F6B5D3;
        cursor: pointer;
        user-select: none;
    }

    @media (max-width: 374px) {
        a:not(.modal_button) {
            padding: 6% 25%;
        }
    }

    .button:hover {
        background-color: #F6B5D3;
    }

    .button:active {
        background-color: #d97544;
    }

    .button:before {
        content: '';
        position: absolute;
        width: 60px;
        height: 60px;
        top: 0;
        left: 0;
        background-image: var(--background_img);
    }

    .button:after {
        content: '';
        position: absolute;
        width: 60px;
        height: 60px;
        top: 0;
        right: 0;
        background-image: var(--background_img);
    }

    .modal_button:before {
        background-image: url('/src/lib/img/modal_okay.png');
    }

    .modal_button:after {
        background-image: url('/src/lib/img/modal_okay.png');
    }

    .modal_button:active:before, .modal_button:active:after {
        background-image: url('/src/lib/img/modal_click.gif');
        background-size: contain;
    }
    .button_container {
        position: relative;
    }

    .animate_pig {
        position: absolute;
    }

    .image_left {
        top: -17.5px;
        left: 1px;
    }

    .image_right {
        top: -17.5px;
        right: 2px;
    }
</style>
