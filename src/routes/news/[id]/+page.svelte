<script>
	import Article from '$lib/components/articles/Article.svelte';
	import PigProfile from '$lib/components/cards/pig-profile-card/PigProfile.svelte';
	import PhotoList from '$lib/components/photo-list/PhotoList.svelte';
</script>

<Article>
	<PigProfile article header="Новость о Свинике" description="Свиник съел все мясные таблетки и теперь здоров"/>
	<PhotoList quantity="4" />
</Article>