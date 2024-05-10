<script>
	import AddPigForm from '$lib/components/forms/AddPigForm.svelte';
	import { onMount } from 'svelte';

	export let data;

	let pig = data.pig;
	let title = `Профиль ${pig.name}`
	let method = 'PATCH';
	let endpoint = '/pigs/' + pig.id;

	onMount(() => {
		const form = document.querySelector('form');
		const fields = form.getElementsByClassName('form-input-field');

		for (const field of fields) {
			if (field.tagName === 'SELECT') {
				setTimeout(() => {
					field.value = pig[field.name] || pig[(field.name.slice(0, field.name.lastIndexOf('_')))].id;
				}, 400);
			} else if (field.type !== 'file') {
				field.value = pig[field.name];
			}
		}

		document.getElementById('id').disabled = true;
	});

</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<AddPigForm {pig} {title} {method} {endpoint} is_editing />