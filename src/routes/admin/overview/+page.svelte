<script>
    import CatalogPage from "$lib/components/pages/CatalogPage.svelte";
    import Button from "$lib/components/misc/button/Button.svelte";

    let adminLogin = false;
    $: tab = 'pigs';
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
                break;
            case 'news':
                data = [{text: 'none', type: 'none'}];
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
</section>

<CatalogPage {data} />

<style>
    .nav-header {
        justify-self: center;
        width: 25%;
        margin-top: 2%;
    }

    .nav-list {
        list-style: none;
        display: flex;
        justify-content: space-between;
    }

    .nav-item {
        cursor: pointer;
    }
</style>