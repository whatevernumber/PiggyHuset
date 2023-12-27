<script>
	import PhotoCard from '$lib/components/photo-card/PhotoCard.svelte';
	import SmolButton from '$lib/components/misc/button/SmolButton.svelte';

	export let header = 'Свиник ищет дом';

	export let profile_pic = "temp-pig-profile-photo.png";
	export let admin;
</script>

<div>
	<PhotoCard width="240" height="244" pic={profile_pic} />
	{#if admin}
		<div class="profile_buttons">
			<SmolButton title="Редактировать" />
			<SmolButton class_name = "super-smol-button" title="Удалить" />
		</div>
	{/if}
</div>

<style>
  .profile_buttons {
      display: flex;
      max-width: 270px;
      justify-content: space-between;
  }
</style>