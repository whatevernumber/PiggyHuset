<script>
	import NewArticleForm from "$lib/components/forms/NewArticleForm.svelte";
	import NewPostForm from '$lib/components/forms/NewPostForm.svelte';
	import { onMount } from 'svelte';

	export let data;


	let article = data.article;
	let type = article.type;
	let method = 'PATCH';
	let endpoint = '/article/' + article.id;

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

</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

{#if type === '1'}
<NewArticleForm {title} {method} {endpoint} />
{:else}
<NewPostForm {title} {method} {endpoint} />
{/if}
