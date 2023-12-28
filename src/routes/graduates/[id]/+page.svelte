<script>
	import Article from '$lib/components/articles/Article.svelte';
	import PigProfile from '$lib/components/cards/pig-profile-card/PigProfile.svelte';
	import PhotoList from '$lib/components/photo-list/PhotoList.svelte';
	import PhotoCard from '$lib/components/photo-card/PhotoCard.svelte';
	import ModalPhotoView from "$lib/components/misc/modal/ModalPhotoView.svelte";
	import {showModal} from "$lib/components/utils/func.js";

	let src = '';

	// осуществляет открытие модального окна с просмотром фото, по которому кликнули
	const photoClickHandler = (evt) => {
		showModal(evt, 'photo-view-modal');
		evt.target.removeEventListener('click', showModal);
		src = evt.target.src;
	};
</script>

<div class="article_wrapper">
	<Article>
		<PigProfile profile_pic="found-home.jpg" header="Нашел дом" graduated description="Финик-Свиник уехал в Мурманск и нашёл там 'Тёплый дом' и много-много друзей" />
		<div class="date">
			<datetime>Graduated: Today at 18:15</datetime>
		</div>
		<PhotoList>
			<PhotoCard clickHandler={photoClickHandler} />
			<PhotoCard clickHandler={photoClickHandler} />
			<PhotoCard clickHandler={photoClickHandler} />
			<PhotoCard clickHandler={photoClickHandler} />
		</PhotoList>
	</Article>
</div>

<ModalPhotoView src="{src}" />

<style>
    .article_wrapper {
        max-width: 1089px;
        margin: 54px auto;
        position: relative;
    }

    .date {
        align-self: flex-end;
        font-style: italic;
        color: #adadad;
    }
</style>