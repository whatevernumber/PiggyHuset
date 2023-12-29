<script>
    import CatalogPage from "$lib/components/pages/CatalogPage.svelte";

    const data = [
        {
            type: 'waiting',
            title: 'Свиник',
            text: 'Ищет самые лучшие ручки на свете',
        },
        {
            type: 'ready',
            title: 'Новость о свинике',
            text: 'Свиник пролечил носик и готов искать новый дом',
        },
        {
            type: 'other-news',
            title: 'Календари, брелки и квилты',
            text: 'Ждут своих покупателей! Вся прибыль пойдёт на покрытие лечения постояльцев Домика.',
        },
    ];
</script>

<svelte:head>
	<title>Новости</title>
</svelte:head>

<CatalogPage category="news" page_title="Новости" {data} />
