<script>
	import Map from '$lib/components/map/Map.svelte';
	import { onMount } from 'svelte';

	$: clinics = [];

	onMount(async () => {
		const res = await fetch('/api/clinics', {
			method: 'GET'
		});

		if (res.ok) {
			clinics = await res.json();
		}
	});
</script>

<svelte:head>
	<meta name="description" content="Здесь вы можете узнать, в какие клиники можно обратиться с морскими свинками" />
	<title>Карта врачей и клиник для морских свинок</title>
</svelte:head>

<div class="map_wrapper">
	<h1>Карта клиник</h1>
	{#key clinics.length}
		<Map bind:clinics={clinics} />
	{/key}
</div>

<style>
	.map_wrapper {
		margin-top: auto;
		padding: 0 50px;
	}

	h1 {
		text-transform: uppercase;
		padding: 5px;
		text-align: center;
	}
</style>