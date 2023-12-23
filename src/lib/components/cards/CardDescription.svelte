<script>
	import PhotoCard from '$lib/components/photo-card/PhotoCard.svelte';
	import ArticleHeader from '$lib/components/misc/h-headers/ArticleHeader.svelte';
	import ArticleText from '$lib/components/articles/ArticleText.svelte';
	import SmolButton from '$lib/components/misc/button/SmolButton.svelte';
	import EditButton from '$lib/components/misc/button/EditButton.svelte';

	export let header;
	export let description;
	export let graduated;
	export let graduated_pic;
	export let article = false;

	export let admin;
</script>

<div class="profile_description">
	<ArticleHeader text={header} />
	<ArticleText text={description} />
	{#if graduated}
		<PhotoCard width="110px" height="110px" alt="Морская свинка в домике" pic = {graduated_pic} admin />
	{:else if !article}
		<SmolButton class_name = "smol-but-long-button" title="Связаться с куратором" />
	{/if}
</div>

<style>
    .profile_description {
        display: flex;
        flex-direction: column;
		flex-grow: 1;
        row-gap: 50px;
    }
</style>