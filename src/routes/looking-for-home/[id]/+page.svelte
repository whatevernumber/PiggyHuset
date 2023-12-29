<script>
	import Article from '$lib/components/articles/Article.svelte';
	import PigProfile from '$lib/components/cards/pig-profile-card/PigProfile.svelte';
	import PhotoList from '$lib/components/photo-list/PhotoList.svelte';
	import ModalContact from "$lib/components/misc/modal/ModalContact.svelte";

	let header = 'Финик';
</script>

<svelte:head>
	<title>{header}</title>
</svelte:head>

<Article>
	<PigProfile />
	<PhotoList quantity="10" />
</Article>

<ModalContact />
