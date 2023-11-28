<script>
	import CardPhoto from '../CardPhoto.svelte';
	import CardDescription from '../CardDescription.svelte';

	export let header = 'Свиник ищет дом';
	export let description = 'Вот тако свиник Вот тако свиник Вот тако свиник Вот тако свиник Вот тако свиник Вот тако свиник';
	export let graduated = true;
	export let profile_pic = "temp-pig-profile-photo.png";
	export let graduated_pic = "found-home.png";
	export let article_class = "";

	let admin = true;
</script>

<div class='profile_wrapper'>
	<CardPhoto {profile_pic} {admin} }/>
	<CardDescription {header} {description} {graduated} {graduated_pic} {article_class}/>
</div>

<style>
	.profile_wrapper {
			display: flex;
			column-gap: 29px;
	}
</style>