<script>
	import Article from '$lib/components/articles/Article.svelte';
	import ArticleHeader from '$lib/components/misc/h-headers/ArticleHeader.svelte';
	import PhotoCard from '$lib/components/photo-card/PhotoCard.svelte';
	import SmolButton from '$lib/components/misc/button/SmolButton.svelte';

	export let pig_name = 'Финик';
	export let pig_age = 2;
	export let pig_description = "Вот тако, Свиник. Вот тако, Свиник. Вот тако, Свиник. Вот тако, Свиник. Вот тако, Свиник. Вот тако, Свиник. Вот тако, Свиник."
	export let owner_name = "Енот";
	export let phone = 4;
</script>

<svelte:head>
	<title>Запрос на передачу свинки</title>
</svelte:head>

<div class="article_wrapper">
	<Article class_name="article_request">
		<ArticleHeader text="Новый запрос" />
		<div class="pig_card">
			<p class="request_test">
				<span class="request_header">Имя свинки:</span> {pig_name}.
			</p>
			<p class="request_test">
				<span class="request_header">Возраст свинки:</span>  {pig_age}.
			</p>
			<p class="request_test">
				<span class="request_header">Описание свинки:</span>  {pig_description}.
			</p>
			<p class="request_test">
				<span class="request_header">Имя владельца:</span>  {owner_name}.
			</p>
			<p class="request_test">
				<span class="request_header">Телефон владельца:</span>  {phone}.
			</p>
			{#if true}
			<div class="photo_wrapper">
				<p class="request_header photo_header">Фотографии:</p>
				<PhotoCard />
				<PhotoCard />
				<PhotoCard />
				<PhotoCard />
				<PhotoCard />
			</div>
			{/if}
			<div class="button_wrapper">
				<SmolButton title="Отправить в архив" />
				<SmolButton title="Удалить" />
			</div>
		</div>
	</Article>
</div>

<style>
    .article_wrapper {
        max-width: 1089px;
        margin: 54px auto;
        position: relative;
    }

	.request_header {
		color: #EF8653;
		font-size: 16px;
		font-weight: bold;
	}
	.pig_card {
		display: flex;
		flex-direction: column;
		row-gap: 15px;
	}

	.photo_header {
		margin-bottom: 20px;
	}

	.button_wrapper {
		text-align: center;
	}

</style>