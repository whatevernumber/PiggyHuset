<script>
	import ProfilePhoto from '$lib/components/cards/pig-profile-card/ProfilePhoto.svelte';
	import CardDescription from '$lib/components/cards/CardDescription.svelte';

	export let header;
	export let description;
	export let graduated;
	export let pic;
	export let age;
    export let type;
	export let article;
	export let admin;
	export let photo_type;
</script>

<div class='profile_wrapper'>
	<ProfilePhoto {pic} {admin} {photo_type} />
	<CardDescription {header} {description} {graduated} {article} {age} />
</div>

<style>
	.profile_wrapper {
		display: flex;
		column-gap: 29px;
	}
</style>