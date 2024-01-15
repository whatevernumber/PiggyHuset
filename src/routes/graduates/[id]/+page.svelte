<script>
	import Article from '$lib/components/articles/Article.svelte';
	import PigProfile from '$lib/components/cards/pig-profile-card/PigProfile.svelte';
	import PhotoList from '$lib/components/photo-list/PhotoList.svelte';
	export let data;

	const type = 'ready';

	const pig = data.pig;
	const pic = pig.main_photo;
	const header = pig.name + ' нашёл дом';
	const age = pig.age;
	const graduated = pig.graduated;
	const description = pig.description;
	const date = pig.datetime;
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
