<script>
	import { _REMOTE_SERVER } from '$env/static/public';
	import { onMount } from 'svelte';

	export let type;
	export let css_class;
	export let grouped = false;
	export let group_by;
	export let options = [];
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
		case 'statuses':
			input_name = 'status'
			break;
		case 'food':
			input_name = 'category'
			break;
		default:
			input_name = type;
	}

	option_name = input_name + '_name';

	onMount(async () => {
		if (type !== 'sex') {

			if (type === 'statuses') {
				option_name = 'text';
			}

			if (type === 'food') {
				option_name = 'value';
			}

			const res = await fetch('/api/' + type);

			if (res.ok) {
				list = await res.json();
			}
		}
	});

	// Показывает или прячет поле для ввода даты выпуска
	const show_graduation_date = (evt) => {

		let status_id = evt.target.value;
		let graduation_date = document.querySelector('input[name="graduation_date"]');

		const AVAILABLE_STATUSES = [1, 5, 6]; // статусы, не предполагающие дату выпуска

		if (AVAILABLE_STATUSES.includes(parseInt(status_id))) {
			graduation_date.parentNode.classList.add('hidden');
		} else {
			graduation_date.parentNode.classList.remove('hidden');
		}
	}

</script>

<select class="{css_class}" name={input_name === type ? input_name : `${input_name}_id`} id={type} on:change={ input_name === 'status' ? show_graduation_date : null}>

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

	{:else if options.length }
		{#each options as option}
			<option value={option.id}>
				{option.value}
			</option>
		{/each}
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
	}

	select:is(:focus, :active) {
        outline-color: #f6b5d3;
    }

	select > option {
		color: #333333;
		text-transform: none;
		font-size: 18px;
	}
</style>