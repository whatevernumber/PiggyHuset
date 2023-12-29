<script>
	import Article from '$lib/components/articles/Article.svelte';
	import PigProfile from '$lib/components/cards/pig-profile-card/PigProfile.svelte';
	import PhotoList from '$lib/components/photo-list/PhotoList.svelte';

	let header = 'Новость о Свинике';
</script>

<svelte:head>
	<title>{header}</title>
</svelte:head>

<Article>
	<PigProfile article header description="Свиник съел все мясные таблетки и теперь здоров"/>
	<PhotoList quantity="4" />
</Article>