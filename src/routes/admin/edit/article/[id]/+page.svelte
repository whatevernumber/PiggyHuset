<script>
	import NewArticleForm from "$lib/components/forms/NewArticleForm.svelte";
	import NewPostForm from '$lib/components/forms/NewPostForm.svelte';
	import { onMount } from 'svelte';

	export let data;


	let article = data.article;
	let type = article.type;
	console.log(article);

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


		let file_input = document.querySelector("input[type='file']");

		article_title.value = article.title;
		article_text.value = article.text;

		// let container = new DataTransfer();
		// container.files = pig.photos;
		// file_input = container.files;
	});

	const title = "Редактировать публикацию";

</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

{#if type === '1'}
<NewArticleForm {title} />
{:else}
<NewPostForm {title} />
{/if}
