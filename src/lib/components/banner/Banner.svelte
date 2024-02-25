<script>
    import ItemLink from "$lib/components/list-item/ItemLink.svelte";
</script>

<div class="promo-container">
    <div class='mobile-icon_wrapper'>
        <img src='/img/big-svinik.png' width='54' height='54' class='mobile-banner-icon mobile-banner-icon-left' alt='Маленькая морская свинка'>
        <img src='/img/banner-log-mobile.png' width='162' height='66' class='mobile-banner-icon mobile-banner-text' alt='Логотип Домика'>
        <img src='/img/big-svinik.png' width='54' height='54' class='mobile-banner-icon mobile-banner-icon-right' alt='Маленькая морская свинка'>
    </div>
    <ul class="option-list">
        <ItemLink text="Ищут дом" href="/looking-for-home" icon="list-icon-light-blue.png" data-sveltekit-preload-data/>
        <ItemLink text="Новости" href="/news" icon="list-icon-light-brown.png" data-sveltekit-preload-data/>
        <ItemLink text="Выпускники" href="/graduates" icon="list-icon-green.png" data-sveltekit-preload-data/>
        <ItemLink text="Полезные статьи" href="/articles" icon="list-icon-grey.png" data-sveltekit-preload-data/>
        <ItemLink href="/turn-in" text="Оставить свинку нам"/>
    </ul>
</div>

<style>

    .promo-container {
        width: 100%;
        height: 600px;
        position: relative;
        display: flex;
        background: #F9EEE1 url('/src/lib/img/svg/banner_background.svg') no-repeat;
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

    .mobile-icon_wrapper {
        display: none;
    }

    @media (max-width: 1001px) {
        .promo-container {
            flex-direction: column;
            background: #F9EEE1 none no-repeat;
            background-size: contain;
        }

        .option-list {
            padding-top: 5px;
            margin: 0 auto;
        }

        .mobile-icon_wrapper {
            margin-top: 10px;
            width: 100%;
            height: 100px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .mobile-banner-icon-right {
            transform: scaleX(-1);
            align-self: flex-start;
        }

        .mobile-banner-icon-left {
            align-self: flex-end;
        }
    }
</style>