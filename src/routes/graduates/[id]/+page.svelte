<script>
	import Article from '$lib/components/articles/Article.svelte';
	import PigProfile from '$lib/components/cards/pig-profile-card/PigProfile.svelte';
	import PhotoList from '$lib/components/photo-list/PhotoList.svelte';
	import { redirect } from '$lib/components/utils/func.js';
	import { _ADMIN_FLAG } from '$env/static/public';
	import { onMount } from 'svelte';

	export let data;

	const type = 'ready';
	const pig = data.pig;
	const pic = pig.main_photo;
	const header = pig.name + ' в Домике';
	const age = pig.age;
	const graduated = pig.graduated;
	const text = pig.description;
	const date = pig.datetime;

	let action;
	let admin = false;

	onMount(() => {
		admin = localStorage.getItem(_ADMIN_FLAG);
	})

	const redirect_to_edit = () => {
		redirect('/admin/edit/pig/' + pig.id);
	}

</script>

<svelte:head>
	<title>{header}</title>
</svelte:head>

<Article {date}>
	<PigProfile {text} {graduated} {pic} {header} {age} {type} {redirect_to_edit} {admin} />

	{#if pig.photos.length > 1}
		<PhotoList photos={pig.photos} />
	{/if}
</Article>
