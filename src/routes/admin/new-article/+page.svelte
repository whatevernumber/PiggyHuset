<script>
	import NewArticleForm from "$lib/components/forms/NewArticleForm.svelte";
	import { _ADMIN_FLAG } from '$env/static/public';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	const title = 'Добавить новую статью';

	let admin = false;

	onMount(() => {
		admin = localStorage.getItem(_ADMIN_FLAG);

		if (!admin) {
			goto('/');
		}
	});
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