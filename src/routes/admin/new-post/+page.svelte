<script>
	import NewPostForm from "$lib/components/forms/NewPostForm.svelte";
	import { _ADMIN_FLAG } from '$env/static/public';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	let admin = false;

	onMount(() => {
		admin = localStorage.getItem(_ADMIN_FLAG);

		if (!admin) {
			goto('/');
		}
	});

</script>

<svelte:head>
	<title>Добавить новый пост</title>
</svelte:head>

<NewPostForm />
