<script>
	import Article from '$lib/components/articles/Article.svelte';
	import PigProfile from '$lib/components/cards/pig-profile-card/PigProfile.svelte';
	import PhotoList from '$lib/components/photo-list/PhotoList.svelte';
	import ModalContact from "$lib/components/misc/modal/ModalContact.svelte";

	export let data;

	let pig = data.pig;
	let profile_pic = pig.main_photo ?? 'kb-pig.png';
	let header = 'Финик';
</script>

<svelte:head>
	<title>{pig.name ?? 'Свинка'}</title>
</svelte:head>

<Article>

	<PigProfile description={pig.description}
				graduated={pig.graduated}
				{profile_pic}
				header={pig.name + ' в поисках дома'}
				age={pig.age};
	/>

	{#if pig.photos.length}
		<PhotoList photos={pig.photos} />
	{/if}
</Article>

<ModalContact />
