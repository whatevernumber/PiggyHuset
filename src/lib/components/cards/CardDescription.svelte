<script>
	import PhotoCard from '$lib/components/photo-card/PhotoCard.svelte';
	import ArticleHeader from '$lib/components/misc/h-headers/ArticleHeader.svelte';
	import ArticleText from '$lib/components/articles/ArticleText.svelte';
	import SmolButton from '$lib/components/misc/button/SmolButton.svelte';
	import EditButton from '$lib/components/misc/button/EditButton.svelte';
	import {showModal} from "$lib/components/utils/func.js";

	export let header;
	export let description;
	export let graduated = false;
	export let graduated_pic = 'found-home.png';
	export let article = false;
	export let age;
	export let admin = true;

	const click_handler = (evt) => {
		showModal(evt);
		evt.target.removeEventListener('click', click_handler);
	}
</script>

<div class="profile_description">
	<ArticleHeader text={header} />
	{#if age}
		<p>Возраст: {age}</p>
	{/if}
	<ArticleText text={description} />
	{#if graduated}
		<PhotoCard width="50px" height="50px" alt="Морская свинка в домике" pic={graduated_pic} />
	{:else if admin && !article}
		<SmolButton class_name="smol-but-long-button" title="Связаться с куратором" {click_handler} />
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