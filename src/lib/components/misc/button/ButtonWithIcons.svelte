<script>
    export let class_name = '';
    export let title;
    export let href;
    export let background_color;
    export let text_color;
    export let icon = 'button-icon-happy-pig.png';
    export let onclick;
    export let border = false;

    let background_img = "url('../src/lib/img/" + icon + "')";
</script>

<a class="button {class_name}" {href} style="--background_color: {background_color}; --background_img: {background_img};
    --text-color: {text_color}"
            on:click={onclick}>
    {title}
</a>

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
    }

    .button:hover {
        background-color: #F6B5D3;
    }

    .button:active {
        background-color: #d97544;
    }

    .button::before {
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

</style>