<script>
    import ItemLink from "../list-item/ItemLink.svelte";
</script>

<div class="promo-container">
<!--    <img src="src/lib/img/svg/big-pig-with-texts.svg" alt="Большая морская свинка" width="" height="">-->
    <ul class="option-list">
        <ItemLink text="Ищут дом"/>
        <ItemLink text="Новости" href="/news"/>
        <ItemLink text="Выпускники"/>
        <ItemLink text="Полезные статьи"/>
    </ul>
</div>

<style>

    .promo-container {
        width: 100%;
        height: 600px;
        position: relative;
        display: flex;
        background: #F6B5D3 url('src/lib/img/svg/banner_background.svg') no-repeat;
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