<script>
	import NewArticleForm from "$lib/components/forms/NewArticleForm.svelte";

	const title = 'Добавить новую статью';
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<NewArticleForm {title} />
