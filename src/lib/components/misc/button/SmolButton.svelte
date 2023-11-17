<script>
    export let className = 'smol-button';
    export let title = 'кнопка';
    export let href;
</script>

<a class="{className}" {href}>
    {title}
</a>

<style>
    .smol-button {
        align-self: flex-end;
        max-width: 125px;
        padding: 5px 20px;
        font-size: 14px;
        text-align: center;
        text-transform: uppercase;
        background-color: #D97544;
        color: #FFFFFF;
    }
</style>