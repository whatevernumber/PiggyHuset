<script>
	import Article from '$lib/components/articles/Article.svelte';
	import CardDescription from '$lib/components/cards/CardDescription.svelte';
	import CardPhoto from '$lib/components/cards/CardPhoto.svelte';
	import PhotoCard from '$lib/components/photo-card/PhotoCard.svelte';

	let additional_photos = true;
</script>

<div class="article_wrapper">
	<Article class_name="article_news">
		<div class="wrapper">
			<CardPhoto pic ='article-pig.png' />
			<CardDescription article header="Статья" description="Что-то очень полезное и интересное" />
		</div>
		<div class="date">
			<datetime>Today at 18:15</datetime>
		</div>
		{#if additional_photos}
			<div class="photo-wrapper">
				<PhotoCard />
				<PhotoCard />
				<PhotoCard />
			</div>
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