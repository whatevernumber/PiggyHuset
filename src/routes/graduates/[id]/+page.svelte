<script>
	import Article from '$lib/components/articles/Article.svelte';
	import PigProfile from '$lib/components/cards/pig-profile-card/PigProfile.svelte';
	import PhotoList from '$lib/components/photo-list/PhotoList.svelte';
	import ModalOkay from '$lib/components/misc/modal/ModalOkay.svelte';
	import { showModal, removeData, closeModal, redirect } from '$lib/components/utils/func.js';

	export let data;

	const type = 'ready';

	const pig = data.pig;
	const pic = pig.main_photo;
	const header = pig.name + ' нашёл дом';
	const age = pig.age;
	const graduated = pig.graduated;
	const description = pig.description;
	const date = pig.datetime;

	let action;
	let success = false;

	const show_delete = (evt) => {
		action = 'delete';
		document.querySelector('.message').innerHTML = `Вы собираетесь удалить профиль "${pig.name}". Это действие <b>необратимо</b>`;
		showModal(evt, 'modal_delete');
		evt.target.removeEventListener('click', show_delete);
		document.removeEventListener('click', closeModal);
	}

	const redirect_to_edit = () => {
		redirect('/admin/edit/pig/' + pig.id);
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
	<title>{header}</title>
</svelte:head>

<Article {date}>
	<PigProfile {description} {graduated} {pic} {header} {age} {type} {redirect_to_edit} />

	{#if pig.photos.length}
		<PhotoList photos={pig.photos} />
	{/if}
</Article>

<div class='modal modal_delete modal_closed'>
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