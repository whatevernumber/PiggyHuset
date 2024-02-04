<script>
	import Article from '$lib/components/articles/Article.svelte';
	import PigProfile from '$lib/components/cards/pig-profile-card/PigProfile.svelte';
	import PhotoList from '$lib/components/photo-list/PhotoList.svelte';
	import { showModal, closeModal, redirect } from '$lib/components/utils/func.js';
	import ModalOkay from '$lib/components/misc/modal/ModalOkay.svelte';

	export let data;
	export let action;

	let pig = data.pig;
	let pig_id = pig.id;
	let pic = pig.main_photo;
	let header = pig.name + ' в поисках дома';
	let age = pig.age;
	let graduated = pig.graduated;
	let description = pig.description;
	let date = pig.datetime;

	let modal = false;

	const show_edit = (evt) => {
		showModal(evt, 'modal_edit');
		evt.target.removeEventListener('click', show_edit);
		document.removeEventListener('click', closeModal);
	}

	const redirect_to_edit = () => {
		redirect('/admin/edit/pig/' + pig.id);
	}

</script>

<svelte:head>
	<title>{pig.name ?? 'Свинка'}</title>
</svelte:head>

<Article {date}>
	<PigProfile {description} {graduated} {pic} {header} {age} {redirect_to_edit} id={pig_id} />

	{#if pig.photos.length > 1}
		<PhotoList photos={pig.photos} />
	{/if}
</Article>

<div class='modal modal_closed'>
	<ModalOkay {action} />
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

	@media (max-width: 1001px) {
        .modal {
            left: 0;
        }
	}
</style>
