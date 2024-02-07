<script>
	import Form from "$lib/components/forms/Form.svelte";

	const title = 'Добавить новую статью';

	const scheme = {
		title: title,
		endpoint: '/articles/type/1',
		fields: [
			{
				label: 'Заголовок статьи',
				name: 'title',
				required: true
			},
			{
				label: 'Автор статьи',
				name: 'author',
			},
			{
				label: 'Текст статьи',
				name: 'text',
				type: 'wysiwyg',
				required: true
			},
			{
				label: 'Источник',
				name: 'origin_link',
			},
		],
		files: {
			file_input: false
		}
	};
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>
<section class="container">
	<Form {scheme} />
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