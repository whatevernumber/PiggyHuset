<script>
	import PhotoCard from '$lib/components/photo-card/PhotoCard.svelte';

	export let photos;
	export let handler;
</script>

<div class='uploaded_files'>
	<p class='uploaded_header'>Загруженные ранее картинки</p>
	<div class='photos_flex_wrapper'>
		{#key photos}
			{#each photos as photo}
				<PhotoCard width='100' height='100' pic={photo} is_form click_handler={handler} />
			{/each}
		{/key}
	</div>
</div>

<style>
    .uploaded_files {
        padding-bottom: 10px;
        padding-left: 20px;
        padding-right: 10px;
        margin: 5px auto 10px;
        background-color: #FFFFFF;
        max-width: 650px;
    }

    .uploaded_header {
        padding-left: 10px;
        padding-top: 5px;
        text-align: left;
        font-weight: bold;
        margin-bottom: 5px;
    }

    .photos_flex_wrapper {
        min-height: 100%;
		width: 650px;
        display: flex;
        column-gap: 25px;
        row-gap: 15px;
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