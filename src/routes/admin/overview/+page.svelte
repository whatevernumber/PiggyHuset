<script>
    import CatalogPage from "$lib/components/pages/CatalogPage.svelte";
    import Button from "$lib/components/misc/button/Button.svelte";
    import SmolButton from '$lib/components/misc/button/SmolButton.svelte';

    export let data;
    let admin = true;

    let tab = 'pigs';
    let action = {label: 'Добавить свинку', href: '/admin/add-pig'};
    let header = 'свинок';
    let type = 'pig';
    $: array = data[tab];

    const switchTabs = function (newtab) {
        tab = newtab;

        switch (tab) {
            default:
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
</script>

<svelte:head>
    <title>Личный кабинет администратора</title>
</svelte:head>

<section class="nav-header">
    <nav class="navigation">
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
<CatalogPage data="{array}" page_title="{'Список ' + header}" category={tab === 'pigs' ? 'looking-for-home' : tab} {type} admin />
{/key}

<style>
    .nav-header {
        align-self: center;
        margin-top: 2%;
        position: relative;
    }

    .nav-list {
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
    }
</style>