<script>
    import CatalogPage from "$lib/components/pages/CatalogPage.svelte";
    import Button from "$lib/components/misc/button/Button.svelte";
    import SmolButton from '$lib/components/misc/button/SmolButton.svelte';
    import Overlay from '$lib/components/misc/overlay/Overlay.svelte'
    import { _ADMIN_FLAG } from '$env/static/public';
    import {afterNavigate, beforeNavigate, goto} from '$app/navigation';
    import { onMount } from 'svelte';
    import {fly} from "svelte/transition";

    export let data;

    let admin = false;

    onMount(() => {
       admin = localStorage.getItem(_ADMIN_FLAG);

        if (!admin) {
            goto('/');
        }
    });

    let tab = 'pigs';
    let action = {label: 'Добавить свинку', href: '/admin/add-pig'};
    let header = 'свинок';
    let type = 'pig';
    $: array = data[tab];

    let modal_opened = false; // Флаг для показа оверлея;

    const switchTabs = function (newtab) {
        tab = newtab;

        switch (tab) {
            default:
                header = 'свинок';
                action = {label: 'Добавить свинку', href: '/admin/add-pig'};
                type = 'pig';
                break;
            case 'news':
                header = 'публикаций';
                action = {label: 'Добавить новость', href: '/admin/new-post'};
                type = 'news';
                break;
            case 'articles':
                header = 'статей';
                action = {label: 'Добавить статью', href: '/admin/new-article'};
                type = 'article';
                break;
            case 'graduates':
                header = 'выпускников';
                type = 'ready';
        }
    };

    beforeNavigate(() => sessionStorage.setItem('tab', tab));
    afterNavigate(() => {
        if (sessionStorage['tab']) {
            switchTabs(sessionStorage['tab']);
        }
    });
</script>

<svelte:head>
    <title>Личный кабинет администратора</title>
</svelte:head>

{#if admin}
<section class="nav-header">
    <nav class="navigation" transition:fly={{ delay: 20, duration: 200, y: -150, opacity: 0.4 }}>
        <ul class="nav-list">
            <li class="nav-item">
                <Button title="Свинки" onclick={() => switchTabs('pigs')} class_name="{tab === 'pigs' ? '-active' : ''}" />
            </li>
            <li class="nav-item">
                <Button title="Новости" onclick={() => switchTabs('news')} class_name="{tab === 'news' ? '-active' : ''}" />
            </li>
            <li class="nav-item">
                <Button title="Статьи" onclick={() => switchTabs('articles')} class_name="{tab === 'articles' ? '-active' : ''}" />
            </li>
            <li class="nav-item">
                <Button title="Выпускники" onclick={() => switchTabs('graduates')} class_name="{tab === 'graduates' ? '-active' : ''}" />
            </li>
        </ul>
    </nav>
    {#if tab !== 'graduates'}
    <div class="button_wrapper">
        <SmolButton title={action.label} href="{action.href}" />
    </div>
    {/if}
</section>

{#key tab}
<CatalogPage data="{array}" page_title="{'Список ' + header}" category={tab === 'pigs' ? 'looking-for-home' : tab} {type} admin bind:modal_opened={modal_opened} data-sveltekit-preload-data/>
{/key}

    {#if modal_opened}
        <Overlay />
    {/if}
{/if}

<style>
    .nav-header {
        align-self: center;
        margin-top: 2%;
        position: relative;
    }

    .nav-list {
        padding: 0;
        list-style: none;
        display: flex;
        justify-content: space-between;
    }

    .nav-item {
        cursor: pointer;
    }

    .button_wrapper {
        position: absolute;
        right: 6%;
        bottom: -50%;
        z-index: 5;
    }

    @media (max-width: 1001px) {
        .nav-header {
            column-gap: 15px;
            position: relative;
            flex-wrap: wrap;
        }

        .navigation {
            margin-bottom: 20px;
        }

        .nav-list {
            flex-direction: column;
            row-gap: 10px;
        }

        .button_wrapper {
            position: static;
            right: 0;
            text-align: right;
        }
    }
</style>
