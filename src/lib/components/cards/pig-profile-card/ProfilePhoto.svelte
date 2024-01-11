<script>
	import PhotoCard from '$lib/components/photo-card/PhotoCard.svelte';
	import SmolButton from '$lib/components/misc/button/SmolButton.svelte';

	export let pic;
	export let admin;
	export let type;
</script>

<div>
	<PhotoCard width="240" height="244" {pic} {type} />
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