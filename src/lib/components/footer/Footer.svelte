<footer class="footer">
    <img class="guinea-pig-icon" src="/img/big-svinik.png" alt="Иконка морской свинки" width="64" height="64">
    <img src="/img/svg/header-logo.svg" alt="Иконка Домика" width="162" height="48">
    <span class="promo">
            Разработка сайта:
            <a class="github-link_wn" href="https://github.com/whatevernumber" target="_blank" rel="external">
                WhateverNumber
            </a>, <a class="github-link_tn" href="https://github.com/the-nepodarok" target="_blank" rel="external">the_nepodarok</a>
        </span>
    <div class='links'>
        <a class="link vk-link" rel="nofollow" href="https://vk.com/domiksvinok" target="_blank">
            <img class="vk-link-image" src="/img/svg/icon-vk.svg" alt="Иконка социальной сети Вконтакте" width="50" height="50">
        </a>
        <a class="link telegram-link" rel="nofollow" href="https://t.me/domiksvinok" target="_blank">
            <img class="telegram-link-image" src="/img/svg/icon-telegram.svg" alt="Иконка социальной сети Вконтакте" width="50" height="50">
        </a>
    </div>
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

    .links {
        display: flex;
        justify-content: space-between;
        margin-left: auto;
        margin-right: 20%;
        column-gap: 10px;
    }

    .link {
        display: block;
        height: 50px;
        align-self: flex-start;
    }

    .promo {
        align-self: center;
        height: min-content;
        font-size: 12px;
        opacity: 0.6;
    }

    .github-link_wn:hover {
        color: #88aa4d;
    }

    .github-link_tn:hover {
        color: #d97544;
    }

    @media (max-width: 1001px) {
        .footer {
            justify-content: space-between;
        }

        .link {
            position: static;
        }

        .links {
            margin-right: 0;
        }

        .promo {
            display: none;
        }
    }
</style>
