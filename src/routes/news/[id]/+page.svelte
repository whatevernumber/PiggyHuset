<script>
	import Article from '$lib/components/articles/Article.svelte';
	import PigProfile from '$lib/components/cards/pig-profile-card/PigProfile.svelte';
	import PhotoList from '$lib/components/photo-list/PhotoList.svelte';

	export let data;

	const news = data.news;
	const header = news.title;
	const description = news.text;
	const date = news.datetime;

</script>

<svelte:head>
	<title>{header}</title>
</svelte:head>

<Article {date}>
	<PigProfile article type="news" {header} {description} />

	{#if news.photos.length}
	<PhotoList photos={news.photos} />
	{/if}
</Article>