<script>
	import Article from '$lib/components/articles/Article.svelte';
	import PigProfile from '$lib/components/cards/pig-profile-card/PigProfile.svelte';
	import PhotoList from '$lib/components/photo-list/PhotoList.svelte';
	export let data;

	const type = 'ready';

	let pig = data.pig;
	let pic = pig.main_photo;
	let header = pig.name + ' нашёл дом';
	let age = pig.age;
	let graduated = pig.graduated;
	let description = pig.description;
	let date = pig.datetime;
</script>

<svelte:head>
	<title>{header}</title>
</svelte:head>

<Article {date}>
	<PigProfile {description} {graduated} {pic} {header} {age} {type} />

	{#if pig.photos.length}
		<PhotoList photos={pig.photos} />
	{/if}
</Article>
