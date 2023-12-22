<script>
    import CatalogPage from "$lib/components/pages/CatalogPage.svelte";
    import Button from "$lib/components/misc/button/Button.svelte";
    import SmolButton from '$lib/components/misc/button/SmolButton.svelte';

    let admin = false;
    $: tab = 'pigs';
    $: action = "Добавить свинку";

    let data = [{
        title: 'Свиник',
        type: 'ready',
    },
        {
            title: 'Блиник',
            type: 'ready',
        },
        {
            title: 'Пиник',
            type: 'ready',
        },];

    const switchTabs = function (newtab) {
        data = [];
        tab = newtab;
        switch (tab) {
            case 'pigs':
                data = [{
                    title: 'Свиник',
                    type: 'ready',
                },
                    {
                        title: 'Блиник',
                        type: 'ready',
                    },
                    {
                        title: 'Пиник',
                        type: 'ready',
                    },];
                action = "Добавить свинку";
                break;
            case 'news':
                data = [{text: 'none', type: 'none'}];
                action = "Добавить новость";
                break;
            case 'articles':
                data = [
                    {
                        title: 'Полезная статья',
                        text: 'Как вытирать носики',
                        type: 'article',
                    },{
                        title: 'Полезная статья',
                        text: 'Как похудеть крупы',
                        type: 'article',
                    },{
                        title: 'Полезная статья',
                        text: 'Как поить маслом',
                        type: 'article',
                    },{
                        title: 'Полезная статья',
                        text: 'Как постричь когти и не умереть',
                        type: 'article',
                    },{
                        title: 'Полезная статья',
                        text: 'Как сдуться',
                        type: 'article',
                    },
                ];
                action = "Добавить статью";
                break;
            case 'graduates':
                data = [{
                    title: 'Финик',
                    text: 'Переехал в Мурманск',
                    image: 'IMG_0695',
                    type: 'graduate',
                },
                    {
                        title: 'Шанс',
                        text: 'На радуге',
                        image: 'FqAKtTrJP58',
                        type: 'graduate',
                    },
                    {
                        title: 'Йогурт',
                        text: 'Более ста фотографий из нового дома со всех сторон в карточке',
                        image: 'yoghurt',
                        type: 'graduate',
                    },
                    {
                        title: 'Эй',
                        text: 'Нашёл дом',
                        image: 'in-the-farm',
                        type: 'graduate',
                    }];
        }
    };
</script>

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
        <SmolButton title={action} />
    </div>
    {/if}
</section>
<CatalogPage {data} page_title='Список публикаций' admin />

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