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
</script>

<div class='profile_wrapper'>
	<ProfilePhoto {type} {pic} {admin} />
	<CardDescription {header} {description} {graduated} {article} {age} />
</div>

<style>
	.profile_wrapper {
		display: flex;
		column-gap: 29px;
	}
</style>