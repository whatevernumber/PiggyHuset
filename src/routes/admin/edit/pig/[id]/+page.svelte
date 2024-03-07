<script>
	import AddPigForm from '$lib/components/forms/AddPigForm.svelte';
	import UploadedFiles from '$lib/components/misc/form-elements/UploadedFiles.svelte';
	import { onMount } from 'svelte';

	export let data;

	let pig = data.pig;
	let title = `Профиль ${pig.name}`
	let method = 'PATCH';
	let endpoint = '/pigs/' + pig.id;
	let photos = pig.photos.map(({ image }) => image);

	// Уже имеющиеся в БД фотографии для отображения и отправки в скрытом поле
	$: old_photos = JSON.stringify(photos);

	onMount(() => {
		const form = document.querySelector('form');
		const fields = form.getElementsByClassName('form-input-field');

		for (const field of fields) {
			if (field.tagName === 'SELECT') {
				setTimeout(() => {
					field.value = pig[field.name] || pig[(field.name.slice(0, field.name.lastIndexOf('_')))].id;
				}, 100);
			} else if (field.type !== 'file') {
				field.value = pig[field.name];
			}
		}

		document.getElementById('id').disabled = true;
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