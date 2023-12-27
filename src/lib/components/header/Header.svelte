<script>
    export let current = '/main';
    export let admin = false;
</script>

<header>
    {#if admin}
        <div class="logo-wrapper">
            <a href="/">
                <img class="logo" src="/src/lib/img/svg/logo-256.svg" alt="Иконка Сообщества Домик" width="256" height="58">
            </a>
        </div>
        <nav class="navigation navigation-admin">
            <a href="/admin/overview" class="nav-link">
                <p class="navigation-home">
                    Личный кабинет администратора
                </p>
                <img class="admin-icon" src="/src/lib/img/svg/admin-home.svg" alt="Иконка домика" width="57" height="50">
            </a>
        </nav>
    {:else if current === '/'}
        <img class="warning-icon" src="/src/lib/img/svg/info-button-svgrepo-com 1.svg" alt="Иконка предупреждение" width="49" height="49">
        <p class="warning-text">
            ВНИМАНИЕ! Мы не принимаем денежные средства! Если вы хотите помочь, напишите нам в
            <span class="vk-green">
                <a class="vk-link" href="https://vk.com">сообщество ВК! </a>
            </span>
        </p>
    {:else }
        <div class="logo-wrapper">
            <a href="/">
                <img class="logo" src="/src/lib/img/svg/logo-256.svg"  alt="Иконка Сообщества Домик" width="256" height="58">
            </a>
        </div>
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
        padding: 0 10px;
        height: 80px;
        display: flex;
        background-color: #FFFFFF;
        font-size: 18px;
        align-items: center;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.06), 0 2px 6px rgba(0, 0, 0, 0.06), 0 0 1px rgba(0, 0, 0, 0.06);

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
        margin-left: 1%;
        padding-top: 7px;
        justify-self: flex-start;
    }

</style>