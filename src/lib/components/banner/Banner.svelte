<script>
    import ItemLink from "$lib/components/list-item/ItemLink.svelte";
</script>

<div class="promo-container">
    <ul class="option-list">
        <ItemLink text="Ищут дом" href="/looking-for-home" icon="list-icon-light-blue.png"/>
        <ItemLink text="Новости" href="/news" icon="list-icon-light-brown.png"/>
        <ItemLink text="Выпускники" href="/graduates" icon="list-icon-green.png"/>
        <ItemLink text="Полезные статьи" href="/articles" icon="list-icon-grey.png"/>
        <ItemLink href="/turn-in" text="Оставить свинку нам"/>
    </ul>
</div>

<style>

    .promo-container {
        width: 100%;
        height: 600px;
        position: relative;
        display: flex;
        background: #F9EEE1 url('./src/lib/img/svg/banner_background.svg') no-repeat;
    }

    .option-list {
        padding: 0;
        margin: 0 5% 0 auto;
        list-style: none;
        align-self: center;
        display: flex;
        flex-direction: column;
        row-gap: 30px;
    }

</style>