<script>
	import PhotoCard from '$lib/components/photo-card/PhotoCard.svelte';

	export let photos;
	export let handler;
	export let main_photo;
	export let old_photo_name;

	let form_photo_type = 'old'; // тип превью фотографий (новые\уже загруженные)
</script>

<div class='uploaded_files'>
	<p class='uploaded_header'>Загруженные ранее картинки</p>
	<div class='photos_flex_wrapper'>
		{#key photos}
			{#each photos as photo, index}
				<PhotoCard width='100' height='100' pic={photo} is_form click_handler={handler} bind:main_photo bind:old_photo_name {form_photo_type} />
			{/each}
		{/key}
	</div>
</div>

<style>
    .uploaded_files {
		max-width: 100%;
        padding: 15px;
        margin: 5px auto 10px;
        background-color: #FFFFFF;
    }

    .uploaded_header {
        padding-left: 10px;
        padding-top: 5px;
        text-align: left;
        font-weight: bold;
        margin-bottom: 15px;
    }

    .photos_flex_wrapper {
        display: flex;
        column-gap: 25px;
        row-gap: 20px;
        flex-wrap: wrap;
        justify-content: space-evenly;
    }

    @media (max-width: 1001px) {
        .photos_flex_wrapper {
            width: 90%;
        }

		.uploaded_files {
			margin-bottom: 5px;
		}
    }
</style>