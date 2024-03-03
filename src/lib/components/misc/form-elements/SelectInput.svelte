<script>
	import { _REMOTE_SERVER } from '$env/static/public';
	import { onMount } from 'svelte';

	export let type;
	let input_name;
	let list = [];
	let option_name;

	switch (type) {
		case 'cities':
			input_name = 'city';
			break;
		case 'overseers':
			input_name = 'overseer'
			break;
	}

	option_name = input_name + '_name';

	onMount(async () => {
		const res = await fetch(_REMOTE_SERVER + '/' + type, {
			method: 'GET',
		});

		if (res.ok) {
			list = await res.json();
		}
	})

</script>

<select name={input_name += '_id'} id={type}>
	{#each list as option}
		<option value={option.id}>
			{option[`${option_name}`]}
		</option>
	{/each}
</select>

<style>
 /* todo */
</style>