<script>
    export let pig_name;
</script>

<div class="pig-notification">
    <p>Животные обработаны от внутренних и внешних паразитов. Отдаются в готовые условия за несколько пачек корма/сена/опилок.</p>
    <p>Возможна доставка по РФ.</p>
    <p>По всем вопросам только в сообщения сообщества с пометкой «{pig_name}».</p>
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
</style>