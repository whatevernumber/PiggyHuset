<script>
    import {_REMOTE_SERVER, _REST_STORAGE_KEY, _ADMIN_FLAG} from "$env/static/public";
    import {goto} from "$app/navigation";
    import {include_auth} from "$lib/components/utils/func.js";
    import {afterUpdate} from "svelte";

    export let current = '/main';
    export let admin = false;

    const logout = async () => {
        try {
            await fetch(`${_REMOTE_SERVER}/admin/logout`, {
                method: 'POST',
                headers: {
                    'Authorization': include_auth(_REST_STORAGE_KEY)
                }
            });
        }
        finally {
            localStorage.removeItem(_ADMIN_FLAG);
            localStorage.removeItem(_REST_STORAGE_KEY);
            window.location.replace('/');
        }
    };

    afterUpdate(() => admin = Boolean(localStorage.getItem(_ADMIN_FLAG)));
</script>

<header>
    {#if admin}
        <a href="/">
            <div class="logo-wrapper" class:hide-logo={current === '/'}>
                <img class="logo" src="/img/svg/header-logo.svg" alt="Иконка Сообщества Домик" width="256" height="58">
            </div>
        </a>
        <nav class="navigation navigation-admin">
            <a href="/admin/overview" class="nav-link" data-sveltekit-preload-data>
                <p class="navigation-home">Личный кабинет администратора</p>
                <img class="admin-icon" src="/img/svg/admin-home.svg" alt="Иконка домика" width="57" height="50">
            </a>
            <p class="logout" on:click={logout} hidden data-sveltekit-reload>Выйти</p>
        </nav>
    {:else if current === '/'}
        <div class="warning">
            <img class="warning-icon" src="/img/svg/info-button-svgrepo-com 1.svg" alt="Иконка предупреждение" width="49" height="49">
            <p class="warning-text">
                <strong>Каждый поросёнок заслуживает свой <b>ДОМИК</b>!</strong>
            </p>
        </div>
    {:else }
        <a href="/" data-sveltekit-preload-data>
            <div class="logo-wrapper">
                <img class="logo" src="/img/svg/header-logo.svg" alt="Иконка Сообщества Домик" width="256" height="58">
            </div>
        </a>
        <nav class="navigation">
                <a class='nav-link' href="/" data-sveltekit-preload-data>
                    <p class='navigation-home'>
                        Главная
                    </p>
                    <img class="logo-home" src="/img/svg/home.svg"  alt="Иконка личного кабинета" width="57" height="49">
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
        background-image: url("/src/lib/img/big-svinik.png");
        background-size: cover;
        position: absolute;
        left: -12px;
        z-index: 5;
    }

    .logo-wrapper.hide-logo::before {
        display: none;
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

    .warning-text strong {
        color: #333333;
        font-weight: normal;
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

    .navigation p {
        &:hover {
            color: #D97544;
        }

        &:active {
            color: #88aa4d;
        }
    }

    .navigation-admin {
        width: 375px;
        position: relative;
    }

    .navigation-home {
        font-weight: bold;
    }

    .nav-link {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .logout {
        position: absolute;
        left: -99px;
        bottom: 12px;
        font-weight: 800;
        cursor: pointer;
    }

    header:hover .navigation-admin .logout {
        display: block;
    }

    .vk-link {
        color: #88AA4D;
    }

    .vk-link:hover {
        color: #E1EDCE;
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

        .navigation {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-evenly;
        }

        .navigation-admin .logout {
            display: block;
            position: static;
            color: #D97544;
        }

        .navigation-home {
            display: none;
        }

        .nav-link .admin-icon {
            width: 50px;
        }

        .warning-text {
            font-size: 12px;
        }
    }
</style>
