<script>
	import Article from '$lib/components/articles/Article.svelte';
	import PigProfile from '$lib/components/cards/pig-profile-card/PigProfile.svelte';
	import PhotoList from '$lib/components/photo-list/PhotoList.svelte';
	import { showModal, removeData, closeModal } from '$lib/components/utils/func.js';
	import ModalOkay from '$lib/components/misc/modal/ModalOkay.svelte';

	export let data;
	export let action;
	export let success;

	let pig = data.pig;
	let pic = pig.main_photo;
	let header = pig.name + ' в поисках дома';
	let age = pig.age;
	let graduated = pig.graduated;
	let description = pig.description;
	let date = pig.datetime;
	let volunteer = 'Дарья';

	const show_delete = (evt) => {
		action = 'delete';
		document.querySelector('.message').innerHTML = `Вы собираетесь удалить профиль "${pig.name}". Это действие <b>необратимо</b>`;
		showModal(evt);
		evt.target.removeEventListener('click', show_delete);
		document.removeEventListener('click', closeModal);
	}

	const remove = () => {
		removeData('article', pig.id, success);

		if (success) {
			action = 'complete';
		} else {
			action = 'fail';
		}
	}

</script>

<svelte:head>
	<title>{pig.name ?? 'Свинка'}</title>
</svelte:head>

<Article {date}>
	<PigProfile {description} {graduated} {pic} {header} {age} {show_delete} {volunteer} />

	{#if pig.photos.length > 1}
		<PhotoList photos={pig.photos} />
	{/if}
</Article>

<div class='modal modal_closed'>
	<ModalOkay {action} action_handler={remove} {success} />
</div>

<style>
    .modal {
        position: absolute;
        top: 35%;
        left: 30%;
        z-index: 10;
    }
</style>
