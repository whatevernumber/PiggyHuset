<script>
	import Article from '$lib/components/articles/Article.svelte';
	import PigProfile from '$lib/components/cards/pig-profile-card/PigProfile.svelte';
	import PhotoList from '$lib/components/photo-list/PhotoList.svelte';
	import { showModal, closeModal, redirect, include_auth } from '$lib/components/utils/func.js';
	import { _ADMIN_FLAG, _REMOTE_SERVER, _REST_STORAGE_KEY } from '$env/static/public';
	import ModalOkay from '$lib/components/misc/modal/ModalOkay.svelte';
	import Overlay from '$lib/components/misc/overlay/Overlay.svelte';
	import { onMount } from 'svelte';

	export let data;

	let pig = data.pig;
	let pig_id = pig.id;
	let pic = pig.main_photo;
	let header = pig.name + ' в поисках дома';
	let age = pig.age;
	let graduated = pig.status_id;
	let text = pig.description;
	let date = pig.datetime;
	let admin = false;

	let modal_opened = false;
	let action = 'change';
	let status_value;
	let success = false;

	onMount(() => {
		admin = localStorage.getItem(_ADMIN_FLAG);
	})

	const show_edit = (evt) => {
		showModal(evt, 'modal_edit');
		evt.target.removeEventListener('click', show_edit);
		document.removeEventListener('click', closeModal);
	}

	const redirect_to_edit = () => {
		redirect('/admin/edit/pig/' + pig.id);
	}

	const redirect_after_graduate = () => {
		redirect(`/graduates/${pig_id}`, 100)
	}

	const cancel = (evt) => {
		modal_opened = false;
		closeModal(evt);
	}

	const graduate_handler = () => {
		graduatePig(status_value);
	}

	async function graduatePig (value) {
		const res = await fetch(_REMOTE_SERVER + '/pigs/graduate/' + pig_id + '/' + value, {
			method: 'PATCH',
			headers: {
				'Authorization': include_auth(_REST_STORAGE_KEY)
			}
		});

		if (res.ok) {
			let result = await res.json();
			if (result) {
				document.querySelector('.message').innerHTML = `Статус успешно изменён`;
				success = true;
				action = 'sent';
			} else {
				action = 'change_fail'
			}
		}
	}
</script>

<svelte:head>
	<title>{pig.name ?? 'Свинка'}</title>
</svelte:head>

<Article {date}>
	<PigProfile {text} {graduated} {pic} {header} {age} {redirect_to_edit} id={pig_id} {admin} bind:modal_opened={modal_opened} bind:status_value={status_value}/>

	{#if pig.photos.length > 1}
		<PhotoList photos={pig.photos} />
	{/if}
</Article>

{#if modal_opened}
	<Overlay />
{/if}

<div class='modal modal_closed'>
	<ModalOkay {action} action_handler={graduate_handler} {success} handle_cancel={cancel} sent_handle={redirect_after_graduate} bind:modal_opened={modal_opened} />
</div>

<style>
    .modal {
        position: absolute;
        top: 35%;
        left: 30%;
        z-index: 10;
    }

    @media (max-width: 1001px) {
        .modal {
            left: 0;
        }
    }
</style>