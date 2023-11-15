<script>
    import ItemLink from "../list-item/ItemLink.svelte";
</script>

<div class="promo-container">
<!--    <img src="src/lib/img/svg/big-pig-with-texts.svg" alt="Большая морская свинка" width="" height="">-->
    <ul class="option-list">
        <ItemLink text="Ищут дом" icon="list-icon-light-blue.png"/>
        <ItemLink text="Новости" href="/news" icon="list-icon-light-brown.png"/>
        <ItemLink text="Выпускники" icon="list-icon-green.png"/>
        <ItemLink text="Полезные статьи" icon="list-icon-grey.png"/>
        <ItemLink text="Оставить свинку нам"/>
    </ul>
</div>

<style>

    .promo-container {
        width: 100%;
        height: 600px;
        position: relative;
        display: flex;
        background: #F9EEE1 url('src/lib/img/svg/banner_background.svg') no-repeat;
    }

    .option-list {
        padding: 0;
        margin: 0;
        margin-left: auto;
        margin-right: 5%;
        list-style: none;
        align-self: center;
        display: flex;
        flex-direction: column;
        row-gap: 30px;
    }

</style>