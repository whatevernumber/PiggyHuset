<script>
    export let title = 'Кнопка';
    export let background_color = '#FFFFFF';
    export let text_color = '#D97544';
    export let href = null;
    export let is_light = false;
    export let onclick;
    export let class_name = '';
</script>

<a class="button {class_name}" class:button-light={is_light} {href}
   on:click={onclick}
   style="--background_color: {background_color}; --text-color: {text_color}"
   tabindex="0">
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
        user-select: none;
        cursor: pointer;
    }

    .button:active {
        background-color: #B25F36;
        color: #e1edce;
    }

    .button-light {
        text-transform: none;
    }

    .button:hover {
        outline: none;
        background-color: #EF8653;
    }

    .button.-active:focus {
        border-color: #f6b5d3;
    }

    .button-light:hover {
        background-color: var(--background_color);
        color: #D97544;
        text-decoration: underline;
        padding: 13px 70px;
        border-top: solid 2px var(--text-color);
        border-bottom: solid 2px var(--text-color);
    }

    .button-light:active {
        background-color: var(--background_color);
        color: #F6B5D3;
        text-decoration: underline;
    }

    .-active {
        color: var(--background_color);
        background-color: var(--text-color);
    }
</style>