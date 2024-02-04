<script>
	import AddPigForm from '$lib/components/forms/AddPigForm.svelte';
	import { onMount } from 'svelte';
	import { _REMOTE_SERVER } from '$env/static/public';
	import PhotoCard from '$lib/components/photo-card/PhotoCard.svelte';

	export let data;

	let pig = data.pig;
	let title = `Профиль ${pig.name}`
	let method = 'PATCH';
	let endpoint = '/pigs/' + pig.id;
	let photos = pig.photos.map(({ image }) => image);

	// Уже имеющиеся в БД фотографии для отображения и отправки в скрытом поле
	$: old_photos = JSON.stringify(photos);

	onMount(() =>
	{
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


<AddPigForm {title} {method} {endpoint} {old_photos} is_editing />
{#if photos.length}
<div class='uploaded_files'>
	<p class='uploaded_header'>Загруженный ранее картинки</p>
	<div class='photos_flex_wrapper'>
		{#key photos}
			{#each photos as photo}
				<PhotoCard width='100' height='100' pic={photo} is_form click_handler={delete_handler} />
			{/each}
		{/key}
	</div>
</div>
{/if}
<style>
	.uploaded_files {
		padding-bottom: 10px;
		padding-left: 20px;
		padding-right: 10px;
		margin: 5px auto;
		background-color: #FFFFFF;
		max-width: 680px;
	}

	.uploaded_header {
		padding-left: 10px;
		padding-top: 5px;
		text-align: left;
		font-weight: bold;
		margin-bottom: 5px;
	}

	.photos_flex_wrapper {
        width: 675px;
        min-height: 100%;
		display: flex;
		column-gap: 25px;
		row-gap: 15px;
		flex-wrap: wrap;
        max-width: 680px;
		justify-content: space-evenly;
	}

    @media (max-width: 1001px) {
        .photos_flex_wrapper {
            width: 90%;
        }
    }
</style>