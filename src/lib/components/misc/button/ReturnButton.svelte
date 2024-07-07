<script>
    import {onDestroy, onMount} from "svelte";
    import {page} from "$app/stores";
    import {goto} from "$app/navigation";
    import {browser} from "$app/environment";

    let referrer = null;

    if (browser) {
        referrer = sessionStorage.getItem('referrer');
    }

    const adjust_button_position = function () {
        const return_button = document.querySelector('.return-button');
        if (window.scrollY > 100) {
            return_button?.classList.add('topped');
        } else {
            return_button?.classList.remove('topped');
        }
    }

    const go_back = () => {
        const href = $page.url.href.endsWith('/') ? $page.url.href.slice(0, -1) : $page.url.href;
        const sub = href.slice(0, href.lastIndexOf('/'));

        if (referrer && (referrer === sub || referrer.includes('overview'))) {
            try {
                history.go(-1);
            } catch (_) {
                goto(referrer);
            }
        } else if (referrer.includes('admin') || href.includes('admin')) {
            if (referrer.includes('info'))
                goto('/info');
            else
                try {
                    goto('/admin/overview');
                } catch (_) {
                    goto('/');
                }
        } else {
            try {
                goto(sub);
            } catch (_) {
                goto('/');
            }
        }
        document.removeEventListener('scroll', adjust_button_position);
    };

    onMount(() => document.addEventListener('scroll', adjust_button_position));
    onDestroy(() => {
        if (browser) {
            document.removeEventListener('scroll', adjust_button_position)
        }
    });
</script>

{#if referrer}
<div class="return-button" on:click={go_back} on:keypress={(e) => {if (e.key === 'Enter') go_back()}} role="button" aria-pressed="false" tabindex="0" title="Вернуться к списку">
    <span class="return-button-text">
        Вернуться к списку
    </span>
</div>
{/if}

<style>
    .return-button {
        position: fixed;
        height: 100%;
        margin: 110px 0 0 40px;
        color: #D97544;
        font-weight: 600;
        cursor: pointer;
        opacity: 0.65;
        user-select: none;
    }

    .return-button:hover {
        opacity: 1;
    }

    .return-button .topped {
        margin-top: 40px;
    }

    @media (max-width: 1001px) {
        .return-button {
            height: fit-content;
            top: auto;
            bottom: 5%;
            visibility: hidden;
        }

        .return-button::before {
            visibility: visible;
            content: 'Назад';
            display: flex;
            place-content: center;
            place-items: center;
            width: 55px;
            height: 55px;
            border-radius: 50%;
            background: #e1edce;
            opacity: 0.5;
        }

        .return-button:active::before,
        .return-button:focus::before,
        .return-button:hover::before {
            opacity: 1;
        }
    }
</style>