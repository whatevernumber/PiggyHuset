<script>
    export let title = 'кнопка';
    export let background_color = '#FFFFFF';
    export let text_color = '#D97544';
    export let href = null;
    export let isLight = false;
    export let onclick;
</script>

<a class="button" {href} style="--background_color: {background_color}; --text-color: {text_color}" class:button-light={isLight}
        on:click={onclick}
    >
    {title}
</a>

<style>

    .button {
        margin: 0 auto;
        display: block;
        padding: 15px 70px;
        max-width: 180px;
        text-align: center;
        text-transform: uppercase;
        font-size: 18px;
        font-weight: 700;
        background-color: var(--background_color);
        color: var(--text-color);
    }

    .button:hover {
        background-color: #EF8653;
    }

    .button:active {
        background-color: #B25F36;
    }

    .button-light {
        text-transform: none;
    }

    .button-light:hover {
        background-color: var(--background_color);
        color: #D97544;
        text-decoration: underline;
    }

    .button-light:active {
        background-color: var(--background_color);
        color: #F6B5D3;
        text-decoration: underline;
    }

</style>