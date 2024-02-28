<script>
    export let click_handler = null;
    export let aria_description = 'Закрыть';
    export let box_size = 30;
    export let css_class = '';
</script>

<button class="close-button{` ${css_class}`}" on:click={click_handler} aria-roledescription="{aria_description}" style="--size: {box_size}px">
    <span hidden>закрыть</span>
</button>

<style>
    .close-button {
        position: absolute;
        width: 30px;
        height: 30px;
        top: -2.5%;
        right: -15%;
        mask: url('/img/svg/close-icon.svg') no-repeat;
        mask-size: var(--size);
        background-color: #b0bd9a;
        border: none;
        transition-duration: 0.3s;
    }

    .close-button:hover {
        scale: 1.2;
        transform: rotate3d(15, 15, 15, 30deg);
        background-color: #EF8653;
        transition-duration: 0.2s;
    }

    @media (max-width: 1001px) {
        .close-button {
            top: -1%;
            right: -3%;
        }
    }

    .close-button.delete {
        width: 20px;
        height: 20px;
        top: 0;
        right: -22px;
        position: absolute;
    }
</style>