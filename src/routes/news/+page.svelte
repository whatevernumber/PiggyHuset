<script>
    import CatalogPage from "$lib/components/pages/CatalogPage.svelte";
	import {onMount} from "svelte";

    let data = [
        {
            id: 1,
            type: 'waiting',
            title: 'Свиник',
            text: 'Ищет самые лучшие ручки на свете',
        },
        {
            id: 2,
            type: 'ready',
            title: 'Новость о свинике',
            text: 'Свиник пролечил носик и готов искать новый дом',
        },
        {
            id: 3,
            type: 'other-news',
            title: 'Календари, брелки и квилты',
            text: 'Ждут своих покупателей! Вся прибыль пойдёт на покрытие лечения постояльцев Домика.',
        },
    ];

	onMount( () => {
		fetch('https://perpl.the-nepodarok.repl.co/web/articles')
			.then((response) => {
				if (response.ok) {
					return response.json()
				}
			})
			.then(json => data = json)
	});
</script>

<svelte:head>
	<title>Новости</title>
</svelte:head>

<CatalogPage category="news" page_title="Новости" {data} />
