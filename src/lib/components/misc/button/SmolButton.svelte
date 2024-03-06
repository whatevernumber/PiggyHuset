<script>
    export let class_name = 'smol-button';
    export let title = 'Кнопка';
    export let href;
    export let click_handler;
</script>

{#if href}
<a class="button smol-button {class_name}" {href} on:click={click_handler}>
    {title}
</a>
{:else}
<button class="button smol-button {class_name}" on:click={click_handler}>
    {title}
</button>
{/if}

<style>

    .button {
        font-size: 14px;
        text-align: center;
        text-transform: uppercase;
        background-color: #D97544;
        color: #FFFFFF;
        border: none;
        user-select: none;
    }

    .button:hover {
        background-color: #EF8653;
    }

    .button:active {
        background-color: #B25F36;
    }

    .smol-button {
        align-self: flex-end;
        max-width: max-content;
        padding: 2px 20px;
        font-family: Jost, Arial, sans-serif;
    }

    .smol-but-long-button {
        align-self: flex-end;
        max-width: 196px;
        padding: 4px 10px;
    }

    .super-smol-button {
        /*max-width: 82px;*/
        padding: 4px 10px;
    }

    .smol-grey {
        padding: 5px 5px;
        background-color: #adadad;
    }

    .smol-red {
        padding: 5px 20px;
        background-color: red;
    }

    .smol-red:hover {
        background-color: rgba(255,85,22,0.87);
    }

    .close-button {
        padding: 5px 20px;
        background-color: green;
    }

    .sort-button {
        padding: 5px 10px;

        &.sort-button:hover {
            opacity: 0.9;
        }

        &.sort-button:active {
            opacity: 1;
            filter: hue-rotate(5deg);
        }
    }

    .sort-button.up,
    .sort-button.down {
        background-color: #88aa4d;
    }

    .sort-button::before,
    .sort-button::after {
        content: " ➚";
        width: 2px;
        height: 2px;
        visibility: hidden;
    }

    .sort-button.up::after {
        visibility: visible;
    }

    .sort-button.down::after {
        content: " ➘";
        visibility: visible;
    }
</style>