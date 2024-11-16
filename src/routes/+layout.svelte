<script>

import {page} from "$app/stores";
import Header from "$lib/components/header/Header.svelte";
import Cookies from '$lib/components/banner/Cookies.svelte';
import Footer from "$lib/components/footer/Footer.svelte";
import ReturnButton from "$lib/components/misc/button/ReturnButton.svelte";
import { onMount } from 'svelte';
import { afterNavigate, invalidateAll } from '$app/navigation';
import { browser } from '$app/environment';

export let data;

$: url = $page.url.pathname;

$: admin = data.authorized;

$: showCookies = browser && !localStorage.getItem('hide-cookies');

const warn = console.warn;
console.warn = (...args) => {
    if (
        args.length === 1 &&
        /was created (with unknown|without expected) prop/.test(args[0])
    ) {
        return;
    }
    warn(...args);
};

// Проверка валидности админского статуса
onMount(async () => {
    if (data.authorized) {
        let check = await fetch('/api/admin', {
            method: 'HEAD',
        });

        if (!check.ok) {
            admin = false;
        }
    }
});

// Проверяет, что пользователь по-прежнему авторизован и меняет флаг
afterNavigate(() => {
    invalidateAll();
    admin = data.authorized ? true : false;
})

</script>

<Header current={url} {admin} />
<slot/>
    {#if $page.params.id}
<ReturnButton />
    {/if}

    {#if (showCookies)}
<Cookies />
    {/if}
<Footer />
