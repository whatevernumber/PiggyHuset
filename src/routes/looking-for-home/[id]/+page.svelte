<script>
	import Article from '$lib/components/articles/Article.svelte';
	import PigProfile from '$lib/components/cards/pig-profile-card/PigProfile.svelte';
	import PhotoList from '$lib/components/photo-list/PhotoList.svelte';
	import ModalContact from "$lib/components/misc/modal/ModalContact.svelte";

	export let data;

	let photo_type = 'profile';

	let pig = data.pig;
	let pic = pig.main_photo;
	let header = pig.name + ' в поисках дома';
	let age = pig.age;
	let graduated = pig.graduated;
	let description = pig.description;
</script>

<svelte:head>
	<title>{pig.name ?? 'Свинка'}</title>
</svelte:head>

<Article>
	<PigProfile {description} {graduated} {pic} {header} {age} {photo_type} />

	{#if pig.photos.length}
		<PhotoList photos={pig.photos} />
	{/if}
</Article>

<ModalContact />
