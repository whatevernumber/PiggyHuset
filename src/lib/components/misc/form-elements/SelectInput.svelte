<script>
	import { _REMOTE_SERVER } from '$env/static/public';
	import { onMount } from 'svelte';

	export let type;
	export let grouped = false;
	export let group_by;

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

	{#if grouped}
	<optgroup class="overseer-active" label="Активные кураторы">
		{#each list as option}
			{#if option[group_by]}
		<option value={option.id}>
			{option[`${option_name}`]}
		</option>
			{/if}
		{/each}
	</optgroup>

	<optgroup class="overseer-inactive" label="Неактивные кураторы">
		{#each list as option}
			{#if !option[group_by]}
			<option value={option.id}>
				{option[`${option_name}`]}
			</option>
			{/if}
		{/each}
	</optgroup>

	{:else}
		{#each list as option}
			<option value={option.id}>
				{option[`${option_name}`]}
			</option>
		{/each}
	{/if}
</select>

<style>
	select {
		width: 200px;
		max-height: 45px;
		padding: 13px 30px 13px 13px;
		font-family: Jost, Arial, sans-serif;
		color: #88aa4d;
		font-weight: bold;
		text-transform: uppercase;
		appearance: none;
		background: #f0f6e6 url("/img/dropdown.png") no-repeat 95% 50%;
		background-size: 20px;
		border: 1px solid transparent;

		&:is(:focus, :active) {
			outline-color: #f6b5d3;
		}
	}

	select > option {
		color: #333333;
		text-transform: none;
		font-size: 18px;
	}
</style>