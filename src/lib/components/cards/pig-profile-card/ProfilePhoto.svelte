<script>
	import PhotoCard from '$lib/components/photo-card/PhotoCard.svelte';
	import SmolButton from '$lib/components/misc/button/SmolButton.svelte';

	export let pic;
	export let admin;
	export let type;
	export let show_delete;
	export let redirect_to_edit;
	export let removable;
	export let status;

</script>

<div class="profile_photo">
	<PhotoCard width="250" {pic} {type} {status} />
	{#if admin}
		<div class="profile_buttons">
			<SmolButton title="Редактировать" click_handler={redirect_to_edit} />
			{#if removable}
			<SmolButton class_name = "super-smol-button" title="Удалить" click_handler={show_delete} />
			{/if}
		</div>
	{/if}
</div>

<style>
	.profile_photo {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

    .profile_buttons {
		display: flex;
        max-width: 270px;
	    margin-top: 5px;
		justify-content: space-between;
    }

	@media (max-width: 1000px) {
		.profile_buttons {
			margin: 0 auto 15px;
		}
	}
</style>