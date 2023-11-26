<script>
    export let className = 'smol-button';
    export let title = 'кнопка';
    export let href = null;
</script>

<a class="button {className}" {href}>
    {title}
</a>

<style>

    .button {
        font-size: 14px;
        text-align: center;
        text-transform: uppercase;
        background-color: #D97544;
        color: #FFFFFF;
    }

    .button:hover {
        background-color: #EF8653;
    }

    .button:active {
        background-color: #B25F36;
    }

    .smol-button {
        align-self: flex-end;
        max-width: 125px;
        padding: 5px 20px;
    }

    .smol-but-long-button {
        align-self: flex-end;
        max-width: 196px;
        padding: 4px 10px;
    }

    .super-smol-button {
        max-width: 82px;
        padding: 4px 10px;
    }

    .smol-grey {
        padding: 5px 5px;
        background-color: #adadad;
    }

</style>