<script>
	import NewArticleForm from "$lib/components/forms/NewArticleForm.svelte";

	const title = 'Добавить новую статью';
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>
<section class="container">
	<NewArticleForm {title} />
</section>

<style>
	.container {
		min-height: 100%;
		margin:auto;
		padding: 20px 0;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>