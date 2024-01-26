<script>
	import AddPigForm from '$lib/components/forms/AddPigForm.svelte';
	import { onMount } from 'svelte';

	export let data;
	let pig = data.pig;
	let title = `Профиль ${pig.name}`

	onMount(() =>
	{
		let pig_name = document.querySelector("[name = 'name']");
		let pig_age = document.querySelector("[name = 'age']");
		let pig_description = document.querySelector("[name = 'description']");
		let pig_overseer = document.querySelector("[name = 'overseer']");
		let file_input = document.querySelector("input[type='file']");

		pig_name.value = pig.name;
		pig_age.value = pig.age;
		console.log(pig_description)
		pig_description.value = pig.description;

		// let container = new DataTransfer();
		// container.files = pig.photos;
		// file_input = container.files;
	});

</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<AddPigForm {title} />