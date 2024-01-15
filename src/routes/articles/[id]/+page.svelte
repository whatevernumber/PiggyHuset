<script>
	import Article from '$lib/components/articles/Article.svelte';
	import CardDescription from '$lib/components/cards/CardDescription.svelte';
	import PhotoCard from '$lib/components/photo-card/PhotoCard.svelte';
	import PhotoList from '$lib/components/photo-list/PhotoList.svelte';

	export let data;

	const article = data.article;
	const pic = article.main_photo;
	const header = article.title;
	const description = article.text;
	const author = article.author;
</script>

<svelte:head>
	<title>{header}</title>
</svelte:head>

<div class="article_wrapper">
	<Article class_name="article_news" date="{article.datetime}">
		<div class="wrapper">
			<PhotoCard {pic} type="article" />
			<CardDescription article {header} {description} {author} />
		</div>
		{#if article.photos.length}
			<PhotoList photos={article.photos} />
		{/if}
	</Article>
</div>

<style>
    .article_wrapper {
        max-width: 600px;
        margin: 54px auto;
        position: relative;
    }

	.wrapper {
			display: flex;
			column-gap: 15px;
	}
</style>