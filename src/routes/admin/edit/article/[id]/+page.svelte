<script>
	import NewArticleForm from "$lib/components/forms/NewArticleForm.svelte";
	import NewPostForm from '$lib/components/forms/NewPostForm.svelte';
	import UploadedFiles from '$lib/components/misc/form-elements/UploadedFiles.svelte';
	import { onMount } from 'svelte';

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
	<UploadedFiles handler={delete_handler} {photos} />
{/if}
