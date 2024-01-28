<script>
	import NewArticleForm from "$lib/components/forms/NewArticleForm.svelte";
	import NewPostForm from '$lib/components/forms/NewPostForm.svelte';
	import { onMount } from 'svelte';
	import PhotoCard from '$lib/components/photo-card/PhotoCard.svelte';

	export let data;


	let article = data.article;
	let type = article.type_id;

	let method = 'PATCH';
	let endpoint = '/articles/' + article.id;

	let photos = article.photos.map(({ image }) => image);

	// Уже имеющиеся в БД фотографии для отображения и отправки в скрытом поле
	$: old_photos = JSON.stringify(photos);

	onMount(() =>
	{
		let article_title = document.querySelector("[name = 'title']");
		let article_text = document.querySelector("[name = 'text']");

		if (type === '2') {
			let article_author = document.querySelector("[name = 'author']");
			let article_link = document.querySelector("[name = 'origin_link']");

			article_author.value = article.author;
			article_link.value = article.origin_link;
		}

		article_title.value = article.title;
		article_text.value = article.text;

	});

	const title = "Редактировать публикацию";

	const delete_handler = (image) => {

		photos = photos.filter(
			(element) => {
				return element !== image
			}
		)
	}

</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

{#if type === '1'}
<NewArticleForm {title} {method} {endpoint} {old_photos} is_editing />
{:else}
<NewPostForm {title} {method} {endpoint} {old_photos} is_editing />
{/if}

{#if photos.length}
<div class='uploaded_files'>
	<p class='uploaded_header'>Загруженный ранее картинки</p>
	<div class='photos_flex_wrapper'>
		{#key photos}
			{#each photos as photo}
				<PhotoCard width='100' height='100' pic={photo} is_form click_handler={delete_handler} />
			{/each}
		{/key}
	</div>
</div>
{/if}

<style>
    .uploaded_files {
        padding-bottom: 10px;
        padding-left: 20px;
        padding-right: 10px;
        margin: 5px auto;
        background-color: #FFFFFF;
        max-width: 680px;
    }

    .uploaded_header {
        padding-left: 10px;
        padding-top: 5px;
        text-align: left;
        font-weight: bold;
        margin-bottom: 5px;
    }

    .photos_flex_wrapper {
        width: 675px;
        min-height: 100%;
        display: flex;
        column-gap: 25px;
        row-gap: 15px;
        flex-wrap: wrap;
        max-width: 680px;
        justify-content: space-evenly;
    }
</style>
