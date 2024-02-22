<script>
	import AddPigForm from '$lib/components/forms/AddPigForm.svelte';
	import UploadedFiles from '$lib/components/misc/form-elements/UploadedFiles.svelte';
	import { onMount } from 'svelte';
	import { _ADMIN_FLAG } from '$env/static/public';
	import { goto } from '$app/navigation';

	export let data;

	let pig = data.pig;
	let title = `Профиль ${pig.name}`
	let method = 'PATCH';
	let endpoint = '/pigs/' + pig.id;
	let photos = pig.photos.map(({ image }) => image);
	let admin = false;

	// Уже имеющиеся в БД фотографии для отображения и отправки в скрытом поле
	$: old_photos = JSON.stringify(photos);

	onMount(() =>
	{
		admin = localStorage.getItem(_ADMIN_FLAG);

		if (!admin) {
			goto('/');
		}

		let pig_name = document.querySelector("[name = 'name']");
		let pig_age = document.querySelector("[name = 'age']");
		let pig_description = document.querySelector("[name = 'description']");

		pig_name.value = pig.name;
		pig_age.value = pig.age;
		pig_description.value = pig.description;
	});

	const delete_handler = (image) => {
		photos = photos.filter(
			(element) => {
				return element !== image
			}
		)
	}
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<AddPigForm {title} {method} {endpoint} {old_photos} is_editing>
{#if photos.length}
	<UploadedFiles handler={delete_handler} {photos} />
{/if}
</AddPigForm>