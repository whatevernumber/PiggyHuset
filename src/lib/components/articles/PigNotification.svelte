<script>
    export let pig_name;
    export let delivery = false;
</script>

<div class="pig-notification">
    <p>Животные обработаны от внутренних и внешних паразитов. Отдаются в готовые условия за несколько пачек корма/сена/опилок.</p>
    <p>По всем вопросам только в сообщения сообщества с пометкой «{pig_name}».</p>
    {#if delivery}
        <p class="delivery">Возможна доставка по РФ.</p>
    {/if}
    <p><strong>Внимание! Если Вы захотели взять у нас свинку, <a href="/articles/1">обязательно ознакомьтесь с нашими условиями</a></strong>!</p>
</div>

<style>
    .pig-notification {
        display: flex;
        flex-direction: column;
        row-gap: 15px;
    }

    .pig-notification a {
        color: #D97544;
    }

    .delivery {
        font-weight: bold;
    }

</style>