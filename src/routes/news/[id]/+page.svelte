<script>
	import Article from '$lib/components/articles/Article.svelte';
	import PigProfile from '$lib/components/cards/pig-profile-card/PigProfile.svelte';
	import PhotoList from '$lib/components/photo-list/PhotoList.svelte';

	export let data;
	let photo_type = 'kb_pig';

	let news = data.news;
	let header = news.title;
	let description = news.text;
	let date = news.datetime;

</script>

<svelte:head>
	<title>{header}</title>
</svelte:head>

<Article {date}>
	<PigProfile article {header} {photo_type} {description} />
	{#if news.photos.length}
	<PhotoList photos={news.photos} />
	{/if}
</Article>