<script>
	import PhotoCard from '$lib/components/photo-card/PhotoCard.svelte';
	import SmolButton from '$lib/components/misc/button/SmolButton.svelte';

	export let pic;
	export let admin = true;
	export let type;
	export let show_delete;
	export let show_edit;

</script>

<div>
	<PhotoCard width="240" height="244" {pic} {type} />
	{#if admin}
		<div class="profile_buttons">
			<SmolButton title="Редактировать" click_handler={show_edit} />
			<SmolButton class_name = "super-smol-button" title="Удалить" click_handler={show_delete} />
		</div>
	{/if}
</div>

<style>
  .profile_buttons {
      display: flex;
      max-width: 270px;
	  margin-top: 5px;
      justify-content: space-between;
  }
</style>