<script>
	import Article from '$lib/components/articles/Article.svelte';
	import PigProfile from '$lib/components/cards/pig-profile-card/PigProfile.svelte';
	import PhotoList from '$lib/components/photo-list/PhotoList.svelte';
	import { showModal, closeModal } from '$lib/components/utils/func.js';
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
	let volunteer = 'Дарья';

	let modal = false;

	const show_edit = (evt) => {
		showModal(evt, 'modal_edit');
		evt.target.removeEventListener('click', show_edit);
		document.removeEventListener('click', closeModal);
	}

	console.log(pig);
</script>

<svelte:head>
	<title>{pig.name ?? 'Свинка'}</title>
</svelte:head>

<Article {date}>
	<PigProfile {description} {graduated} {pic} {header} {age} {show_edit} {volunteer} id={pig_id} />

	{#if pig.photos.length > 1}
		<PhotoList photos={pig.photos} />
	{/if}
</Article>

<div class='modal modal_delete modal_closed'>
	<ModalOkay {action} />
</div>

<div class='modal modal_edit modal_closed'>
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
