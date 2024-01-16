<script>
	import NewPostForm from "$lib/components/forms/NewPostForm.svelte";
</script>

<svelte:head>
	<title>Добавить новый пост</title>
</svelte:head>

<div class="article_wrapper">
	<NewPostForm />
</div>

<style>
	.article_wrapper {
		max-width: 1089px;
		margin: 54px auto;
		position: relative;
	}

	.form-wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		row-gap: 15px;
	}

	.photo-area {
		width: 800px;
		display: flex;
		column-gap: 30px;
		align-items: center;
	}

	.photo-uploaded {
		max-width: 600px;
		text-align: center;
		margin-left: auto;
	}

	.uploaded-text {
		margin-bottom: 10px;
	}
</style>