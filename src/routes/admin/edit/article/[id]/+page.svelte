<script>
	import NewArticleForm from "$lib/components/forms/NewArticleForm.svelte";
	import NewPostForm from '$lib/components/forms/NewPostForm.svelte';
	import { onMount } from 'svelte';
	import {_REMOTE_SERVER} from "$env/static/public";

	export let data;

	let article = data.article;
	let type = article.type_id;

	let method = 'PATCH';
	let endpoint = 'articles/edit?id=' + article.id;

	onMount(() =>
	{
		let article_title = document.querySelector("input[name='title']");
		let article_tags = document.querySelector("input[name='hashtags']");

		let article_meta_title = document.querySelector("input[name='meta_title']");
		let article_meta_desc = document.querySelector("input[name='meta_description']");

		if (article?.tags) {
			article_tags.value = article.tags.map((el) => el.tag_value).join(' ');
		}

		article_title.value = article.title;
		article_meta_title.value = article.meta_title;
		article_meta_desc.value = article.meta_description;

			if (type === 1) {
				let article_author = document.querySelector("input[name='author']");
				let article_link = document.querySelector("[name='origin_link']");

				article_author.value = article.author;
				article_link.value = article.origin_link;
			}

		let editor = document.querySelector('.ql-editor');
		editor.innerHTML = article.text;

		// правильное отображение картинок с сервера в редакторе
		for (const img of editor.getElementsByTagName('img')) {
			if ((img.src.includes('domik-article'))) {
				img.src = `${_REMOTE_SERVER}/img/${img.src.slice(img.src.lastIndexOf('/') + 1)}`;
			}
		}
		});

	const title = "Редактировать публикацию";
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

{#if type === 1}
<NewArticleForm {title} {method} {endpoint} {article} is_editing />
{:else}
<NewPostForm {title} {method} {endpoint} {article} is_editing />
{/if}
