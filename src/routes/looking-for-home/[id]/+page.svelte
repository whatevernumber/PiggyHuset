<script>
	import Article from '$lib/components/articles/Article.svelte';
	import PigProfile from '$lib/components/cards/pig-profile-card/PigProfile.svelte';
	import PhotoList from '$lib/components/photo-list/PhotoList.svelte';
	import ModalContact from "$lib/components/misc/modal/ModalContact.svelte";

	export let data;

	let photo_type = 'profile';

	const pig = data.pig;
	const pic = pig.main_photo;
	const header = pig.name + ' в поисках дома';
	const age = pig.age;
	const graduated = pig.graduated;
	const description = pig.description;
	const date = pig.datetime;
</script>

<svelte:head>
	<title>{pig.name ?? 'Свинка'}</title>
</svelte:head>

<Article {date}>
	<PigProfile {description} {graduated} {pic} {header} {age} {photo_type} />

	{#if pig.photos.length > 1}
		<PhotoList photos={pig.photos} />
	{/if}
</Article>

<ModalContact />
