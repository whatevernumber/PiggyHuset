<script>
    export let current = '/main';
    export let admin = false;
</script>

<header>
    {#if admin}
            <a href="/">
                <div class="logo-wrapper">
                    <img class="logo" src="/src/lib/img/svg/header-logo.svg" alt="Иконка Сообщества Домик" width="256" height="58">
                </div>
            </a>
        <nav class="navigation navigation-admin">
            <a href="/admin/overview" class="nav-link">
                <p class="navigation-home">
                    Личный кабинет администратора
                </p>
                <img class="admin-icon" src="/src/lib/img/svg/admin-home.svg" alt="Иконка домика" width="57" height="50">
            </a>
        </nav>
    {:else if current === '/'}
        <div class="warning">
            <img class="warning-icon" src="/src/lib/img/svg/info-button-svgrepo-com 1.svg" alt="Иконка предупреждение" width="49" height="49">
            <p class="warning-text">
                <strong>ВНИМАНИЕ!</strong> Если Вы хотите помочь, напишите нам в
                <span class="vk-green">
                    <a class="vk-link" href="https://vk.com">сообщество ВК! </a>
                </span>
            </p>
        </div>
    {:else }
        <a href="/">
            <div class="logo-wrapper">
                <img class="logo" src="/src/lib/img/svg/header-logo.svg" alt="Иконка Сообщества Домик" width="256" height="58">
            </div>
        </a>
        <nav class="navigation">
                <a class='nav-link' href="/">
                    <p class='navigation-home'>
                        Главная
                    </p>
                    <img class="logo-home" src="/src/lib/img/svg/home.svg"  alt="Иконка личного кабинета" width="57" height="49">
                </a>
        </nav>
    { /if}
</header>

<style>
    header {
        min-width: calc(100% - 20px);
        max-width: 100vw;
        height: 80px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #FFFFFF;
        font-size: 18px;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.06), 0 2px 6px rgba(0, 0, 0, 0.06), 0 0 1px rgba(0, 0, 0, 0.06);
    }

    .warning {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50%;

        & strong {
            font-weight: normal;
            color: #D97544;
          }
    }

    .warning-text {
        margin-right: auto;
    }

    .warning-icon {
        margin-left: auto;
        margin-right: 2%;
    }

    .navigation {
        width: 150px;
        margin-left: auto;
        margin-right: 1%;
    }

    .navigation-admin {
        width: 375px;
    }

    .navigation-home {
        font-weight: bold;
    }

    .nav-link {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .vk-link {
        color: #88AA4D;
    }

    .vk-link:hover {
        color: #E1EDCE;
    }

    .logo-wrapper {
        margin-left: 10%;
        padding-top: 7px;
        justify-self: flex-start;
    }

    .logo-wrapper::before {
        content: '';
        display: flex;
        width: 98px;
        height: 98px;
        background-image: url("/src/lib/img/big-svinik-1.png");
        background-size: cover;
        position: absolute;
        left: -12px;
    }

    @media (max-width: 1001px) {
        header {
            width: 100vw;
            box-shadow: none;
            border-bottom: 1px solid rgba(173, 173, 173, 0.5);
        }

        .warning {
            margin: 0 18px;
            width: 100%;
            column-gap: 2%;
        }

        .logo-wrapper {
            margin-left: 7%;
        }

        .nav-link {
            visibility: hidden;
        }

        .warning-text {
            font-size: 12px;
        }
    }
</style>