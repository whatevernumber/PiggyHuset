<script>
    import CatalogPage from "$lib/components/pages/CatalogPage.svelte";
	import VKCommunityMessages from "$lib/components/widgets/VKCommunityMessages.svelte";

	export let data;
	const pigs = data.pigs;
	const count = data.count;
</script>

<svelte:head>
	<meta name="description" content="Морские свинки из Домика для бездомных поросят ищут дом" />
	<title>Ищут дом</title>
</svelte:head>

<CatalogPage category="looking-for-home" page_title="Ищут дом" data={pigs} {count} type="pig" />
<VKCommunityMessages />
