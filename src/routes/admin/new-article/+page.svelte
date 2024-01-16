<script>
	import NewArticleForm from "$lib/components/forms/NewArticleForm.svelte";

	const title = 'Добавить новую статью';
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<NewArticleForm {title} />

<style>
    .article_wrapper {
        max-width: 1089px;
        margin: 54px auto;
        position: relative;
    }
</style>