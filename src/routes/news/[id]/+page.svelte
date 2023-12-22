<script>
	import Article from '$lib/components/articles/Article.svelte';
	import PigProfile from '$lib/components/cards/pig-profile-card/PigProfile.svelte';
	import PhotoList from '$lib/components/photo-list/PhotoList.svelte';
	import PhotoCard from '$lib/components/photo-card/PhotoCard.svelte';
</script>

<div class="article_wrapper">
	<Article>
		<PigProfile header="Новость о Свинике" description="Свиник съел все мясные таблетки и теперь здоров"/>
		<div class="date">
			<datetime>Today at 18:15</datetime>
		</div>
		<PhotoList>
			<PhotoCard />
			<PhotoCard />
			<PhotoCard />
			<PhotoCard />
		</PhotoList>
	</Article>
</div>

<style>
    .article_wrapper {
        max-width: 1089px;
        margin: 54px auto;
        position: relative;
    }

	.date {
		align-self: flex-end;
		font-style: italic;
		color: #adadad;
	}
</style>