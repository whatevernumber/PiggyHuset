<script>
	import NewArticleForm from "$lib/components/forms/NewArticleForm.svelte";
</script>

<svelte:head>
	<title>Добавить новую статью</title>
</svelte:head>

<div class="article_wrapper">
	<NewArticleForm />
</div>


<style>
    .article_wrapper {
        max-width: 1089px;
        margin: 54px auto;
        position: relative;
    }
</style>