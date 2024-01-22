<script>
	import ProfilePhoto from '$lib/components/cards/pig-profile-card/ProfilePhoto.svelte';
	import CardDescription from '$lib/components/cards/CardDescription.svelte';

	export let header;
	export let description;
	export let graduated;
	export let pic;
	export let id;
	export let age;
    export let type;
	export let article;
	export let volunteer;
	export let admin;
	export let show_delete;
	export let show_edit;
	export let removable;
</script>

<div class='profile_wrapper'>
	<ProfilePhoto {type} {pic} {admin} {show_delete} {show_edit} {removable}/>
	<CardDescription {header} {description} {graduated} {article} {age} {volunteer} {id}/>
</div>

<style>
	.profile_wrapper {
		display: flex;
		column-gap: 29px;
	}
</style>