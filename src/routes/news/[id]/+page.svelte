<script>
	import Article from '$lib/components/articles/Article.svelte';
	import PigProfile from '$lib/components/cards/pig-profile-card/PigProfile.svelte';
	import PhotoList from '$lib/components/photo-list/PhotoList.svelte';
	import ModalOkay from '$lib/components/misc/modal/ModalOkay.svelte';
	import { showModal, removeData, closeModal } from '$lib/components/utils/func.js';

	export let data;

	let news = data.news;
	let header = news.title;
	let description = news.text;
	let date = news.datetime;

	let action;
	let success;

	const show_delete = (evt) => {
		action = 'delete';
		document.querySelector('.message').innerHTML = `Вы собираетесь удалить статью "${header}". Это действие <b>необратимо</b>`;
		showModal(evt);
		evt.target.removeEventListener('click', show_delete);
		document.removeEventListener('click', closeModal);
	}

	const remove = () => {
		removeData('article', news.id, success);

		if (success) {
			action = 'complete';
		} else {
			action = 'fail';
		}
	}

</script>

<svelte:head>
	<title>{header}</title>
</svelte:head>

<Article {date}>
	<PigProfile article type="news" {header} {description} />

	{#if news.photos.length}
	<PhotoList photos={news.photos} />
	{/if}
</Article>