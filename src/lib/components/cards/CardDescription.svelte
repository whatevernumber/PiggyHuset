<script>
	import PhotoCard from '$lib/components/photo-card/PhotoCard.svelte';
	import ArticleHeader from '$lib/components/misc/h-headers/ArticleHeader.svelte';
	import ArticleText from '$lib/components/articles/ArticleText.svelte';
	import SmolButton from '$lib/components/misc/button/SmolButton.svelte';

	export let header = 'Свиник ищет дом';
	export let description = 'Вот тако свиник Вот тако свиник Вот тако свиник Вот тако свиник Вот тако свиник Вот тако свиник';
	export let graduated = true;
	export let graduated_pic = "found-home.png";
	export let article_class = "";
	export let article = false;

	export let admin = true;
</script>

<div class="profile_description {article_class}">
	<ArticleHeader text={header} />
	<ArticleText text={description} />
	{#if graduated}
		<PhotoCard width="110px" height="110px" alt="Морская свинка в домике" pic = {graduated_pic} />
	{:else if !article}
		<SmolButton className = "smol-but-long-button" title="Связаться с куратором" />
	{/if}
</div>

<style>
    .profile_description {
        min-width: 740px;
        display: flex;
        flex-direction: column;
        row-gap: 50px;
    }

</style>