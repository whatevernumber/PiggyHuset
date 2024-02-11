<script>
	import AddPigForm from '$lib/components/forms/AddPigForm.svelte';
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
	<title>Добавить новую свинку</title>
</svelte:head>

<AddPigForm />
