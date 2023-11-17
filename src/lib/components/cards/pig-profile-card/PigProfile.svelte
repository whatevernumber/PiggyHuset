<script>
	import PhotoCard from '../../photo-card/PhotoCard.svelte';
	import ArticleHeader from '../../misc/h-headers/ArticleHeader.svelte';
	import ArticleText from '../../articles/ArticleText.svelte';
	import Button from '$lib/components/misc/button/Button.svelte';
</script>

<div class='profile_wrapper'>
	<div class="profile_picture">
		<PhotoCard width="240" height="244" pic="temp-pig-profile-photo.png" />
		<div class="profile_buttons">
			<Button />
			<Button />
		</div>
	</div>
	<div class="profile_description">
		<ArticleHeader text="Свиник ищет дом" />
		<ArticleText text="Вот тако свиник Вот тако свиник Вот тако свиник Вот тако свиник Вот тако свиник Вот тако свиник" />
	</div>
</div>

<style>
	.profile_wrapper {
			display: flex;
			column-gap: 29px;
	}

	.profile_description {
			display: flex;
			flex-direction: column;
			row-gap: 50px;
	}

	.profile_buttons {
			display: flex;
			max-width: 240px;
			justify-content: space-between;
	}
</style>