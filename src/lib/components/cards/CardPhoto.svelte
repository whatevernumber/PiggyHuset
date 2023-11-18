<script>
	import PhotoCard from '$lib/components/photo-card/PhotoCard.svelte';
	import SmolButton from '$lib/components/misc/button/SmolButton.svelte';

	export let header = 'Свиник ищет дом';
	export let pic = "temp-pig-profile-photo.png";
	export let admin = true;
</script>

<div>
	<PhotoCard width="240" height="244" {pic} />
	{#if admin}
		<div class="profile_buttons">
			<SmolButton title="Редактировать" />
			<SmolButton className = "super-smol-button" title="Удалить" />
		</div>
	{/if}
</div>

<style>

    .profile_buttons {
        display: flex;
        max-width: 240px;
        justify-content: space-between;
    }
</style>