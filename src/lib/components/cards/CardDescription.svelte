<script>
	import PhotoCard from '$lib/components/photo-card/PhotoCard.svelte';
	import ArticleHeader from '$lib/components/misc/h-headers/ArticleHeader.svelte';
	import ArticleText from '$lib/components/articles/ArticleText.svelte';
	import SmolButton from '$lib/components/misc/button/SmolButton.svelte';
	import {showModal} from "$lib/components/utils/func.js";

	export let header;
	export let description;
	export let graduated;
	export let article;
	export let age;
	export let author;
	export let admin;

	const click_handler = (evt) => {
		showModal(evt);
		evt.target.removeEventListener('click', click_handler);
	}
</script>

<div class="profile_description">
	<ArticleHeader text={header} />
	{#if graduated}
	<div class='graduated_image'>
		<img class="graduated-icon" src="/src/lib/img/found-home.png" width="50px" height="50px" alt="Морская свинка в домике">
	</div>
	{/if}
	{#if age}
		<p>Возраст: {age}</p>
	{/if}
	{#if author}
		<p>Автор статьи: {author}</p>
	{/if}
	<ArticleText text={description} />

	{#if admin && !article}
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

	.graduated_image {
		justify-self: flex-start;
	}
</style>