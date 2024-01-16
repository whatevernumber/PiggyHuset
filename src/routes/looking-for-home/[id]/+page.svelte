<script>
	import Article from '$lib/components/articles/Article.svelte';
	import PigProfile from '$lib/components/cards/pig-profile-card/PigProfile.svelte';
	import PhotoList from '$lib/components/photo-list/PhotoList.svelte';
	import { showModal, removeData, closeModal } from '$lib/components/utils/func.js';
	import ModalOkay from '$lib/components/misc/modal/ModalOkay.svelte';
	import ModalForm from '$lib/components/misc/modal/ModalForm.svelte';

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

	let modal = false;

	const show_delete = (evt) => {
		action = 'delete';
		document.querySelector('.message').innerHTML = `Вы собираетесь удалить профиль "${pig.name}". Это действие <b>необратимо</b>`;
		showModal(evt, 'modal_delete');
		evt.target.removeEventListener('click', show_delete);
		document.removeEventListener('click', closeModal);
	}

	const show_edit = (evt) => {
		showModal(evt, 'modal_edit');
		evt.target.removeEventListener('click', show_edit);
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
	<PigProfile {description} {graduated} {pic} {header} {age} {show_delete} {show_edit} {volunteer} />

	{#if pig.photos.length > 1}
		<PhotoList photos={pig.photos} />
	{/if}
</Article>

<div class='modal modal_delete modal_closed'>
	<ModalOkay {action} action_handler={remove} {success} />
</div>

<div class='modal modal_edit modal_closed'>
	<ModalForm type='pig' {modal} />
	<button class="close-button" on:click={closeModal} aria-roledescription="Закрыть окно с формой">
            <span hidden>
                закрыть
            </span>
	</button>
</div>

<style>
    .modal {
        position: absolute;
        top: 35%;
        left: 30%;
        z-index: 10;
    }

    .close-button {
        position: absolute;
        width: 35px;
        height: 35px;
        top: -2.5%;
        right: -5%;
        background: url('$lib/img/x.png') no-repeat;
        border: none;
    }

    .close-button:hover {
        scale: 1.2;
        transition: 0.5s;
    }
</style>
