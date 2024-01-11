<script>
	import Article from '$lib/components/articles/Article.svelte';
	import CardDescription from '$lib/components/cards/CardDescription.svelte';
	import PhotoCard from '$lib/components/photo-card/PhotoCard.svelte';
	import PhotoList from '$lib/components/photo-list/PhotoList.svelte';

	export let data;

	let photo_type = 'article';

	let article = data.article;
	let author = article.author;
	let header = article.title;
	let description = article.text;
	let pic = article.main_photo;
	let date = article.datetime;

	console.log(article)
</script>

<svelte:head>
	<title>{header}</title>
</svelte:head>

<div class="article_wrapper">
	<Article class_name="article_news" {date}>
		<div class="wrapper">
			<PhotoCard {pic} {photo_type} />
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

	.photo-wrapper {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
	}

    .date {
        align-self: flex-end;
        font-style: italic;
        color: #adadad;
    }
</style>