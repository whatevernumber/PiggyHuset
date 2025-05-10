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
	<meta name="description" content="Рейтинг ветеринарных клиник для грызунов. Есть ли ратолог в моем городе? Куда можно обратиться с морской свинкой?" />
	<title>Карта клиник и ратологов по городам</title>
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
		padding: 0 5vw;
	}

	h1 {
		text-transform: uppercase;
		padding: 5px;
		text-align: center;
		margin: 0 0 25px;
	}
</style>