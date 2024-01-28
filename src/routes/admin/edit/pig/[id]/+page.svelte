<script>
	import AddPigForm from '$lib/components/forms/AddPigForm.svelte';
	import { onMount } from 'svelte';
	import { _REMOTE_SERVER } from '$env/static/public';

	export let data;

	let pig = data.pig;
	let title = `Профиль ${pig.name}`
	let method = 'PATCH';
	let endpoint = '/pigs/' + pig.id;

	onMount(() =>
	{
		let pig_name = document.querySelector("[name = 'name']");
		let pig_age = document.querySelector("[name = 'age']");
		let pig_description = document.querySelector("[name = 'description']");

		pig_name.value = pig.name;
		pig_age.value = pig.age;
		pig_description.value = pig.description;
	});


</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<AddPigForm {title} {method} {endpoint} />