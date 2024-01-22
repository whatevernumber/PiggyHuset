<script>
    import CatalogPage from "$lib/components/pages/CatalogPage.svelte";
    import Button from "$lib/components/misc/button/Button.svelte";
    import SmolButton from '$lib/components/misc/button/SmolButton.svelte';

    export let data;
    let admin = true;

    let tab = 'pigs';
    let action = ["Добавить свинку", '/admin/add-pig'];
    let header = 'свинок';

    $: array = data[tab];
    const switchTabs = function (newtab) {
        tab = newtab;

        switch (tab) {
            case 'pigs':
                header = 'свинок';
                action = ['Добавить свинку', '/admin/add-pig'];
                break;
            case 'news':
                header = 'публикаций';
                action = ['Добавить новость', '/admin/new-post'];
                break;
            case 'articles':
                header = 'статей';
                action = ['Добавить статью', '/admin/new-article'];
                break;
            case 'graduates':
                header = 'выпускников';
        }
    };

    console.log(tab);
</script>

<svelte:head>
    <title>Личный кабинет администратора</title>
</svelte:head>

<section class="nav-header">
    <nav class="navigation">
        <ul class="nav-list">
            <li class="nav-item">
                <Button title="Свинки" onclick={() => switchTabs('pigs')} />
            </li>
            <li class="nav-item">
                <Button title="Новости" onclick={() => switchTabs('news')} />
            </li>
            <li class="nav-item">
                <Button title="Статьи" onclick={() => switchTabs('articles')} />
            </li>
            <li class="nav-item">
                <Button title="Выпускники" onclick={() => switchTabs('graduates')} />
            </li>
        </ul>
    </nav>
    {#if tab !== 'graduates'}
    <div class="button_wrapper">
        <SmolButton title={action[0]} href="{action[1]}" />
    </div>
    {/if}
</section>
<CatalogPage data="{array}" page_title="{'Список ' + header}" category={tab} admin />

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