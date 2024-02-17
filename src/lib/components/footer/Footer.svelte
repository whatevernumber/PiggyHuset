<footer class="footer">
    <img class="guinea-pig-icon" src="/img/svg/guinea-pig-small.svg" alt="Иконка морской свинки" width="64" height="58">
    <img src="/img/svg/header-logo.svg" alt="Иконка Домика" width="162" height="48">

    <a class="vk-link" href="https://vk.com" rel="external">
        <img class="vk-link-image" src="/img/svg/vk.svg" alt="Иконка социальной сети Вконтакте" width="24" height="27">
    </a>
</footer>


<style>

    .footer {
        width: 100%;
        height: 80px;
        margin-top: auto;
        background-color: #F6B5D3;
        display:flex;
        justify-content: flex-start;
        align-items: center;
    }

    .vk-link {
        display: block;
        height: 27px;
        padding-right: 40px;
        position: absolute;
        right: 0;
    }

    @media (max-width: 1001px) {
        .footer {
            justify-content: space-between;
        }

        .vk-link {
            position: static;
        }
    }

</style>
