<script>
	import Article from '$lib/components/articles/Article.svelte';
	import PigProfile from '$lib/components/cards/pig-profile-card/PigProfile.svelte';
	import { showModal, closeModal, redirect, include_auth } from '$lib/components/utils/func.js';
	import { _ADMIN_FLAG, _REMOTE_SERVER, _REST_STORAGE_KEY } from '$env/static/public';
	import ModalOkay from '$lib/components/misc/modal/ModalOkay.svelte';
	import Overlay from '$lib/components/misc/overlay/Overlay.svelte';
	import { onMount } from 'svelte';
	import VKCommunityMessages from "$lib/components/widgets/VKCommunityMessages.svelte";
	export let data;

	let pig = data.pig;

	let pig_id = pig.id;
	let pig_name = pig.name;
	let pic = pig.main_photo;
	let age = pig.age;
	let text = pig.description;
	let date = pig.datetime;
	let city = pig.city.city_name;
	let overseer = pig.overseer ? pig.overseer.overseer_name : null;
	let admin = false;

	let modal_opened = false;
	let action = 'change';
	let status_value; // Выбранное в чекбоксе id статуса, изменяется при действии 'Graduate'
	let success = false;
	let pig_sex = pig.sex;
	let pig_status = pig.status ? pig.status.text : ''; // Текущий статус свинки;

	let status_picture = pig.status.value; // Для отображения мини-картинки статуса для Карантина

	const AVAILABLE_STATUSES = [1, 5, 6];
	$: pig_status_id = pig.status_id;


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

	const graduate_handler = () => {
		graduatePig(status_value);

		if ((AVAILABLE_STATUSES.includes(parseInt(status_value)) && AVAILABLE_STATUSES.includes(pig_status_id))) {
			action = 'complete';
			pig_status_id = parseInt(status_value);

			if (pig_status_id === 6) {
				status_picture = 'quarantine';
			} else {
				status_picture = null;
			}
		} else {
			action = 'sent';
		}
	}

	const redirect_after_graduate = () => {
		if (action === 'sent') {
			redirect(`/graduates/${pig_id}`, 100);
		}
	}

	const cancel = (evt) => {
		modal_opened = false;
		closeModal(evt);
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
			} else {
				action = 'change_fail'
			}
		}
	}
</script>

<svelte:head>
	<title>{pig_name ?? 'Свинка'}</title>
</svelte:head>

{#key pig_status_id}
<Article {date} {text} type="pig" photos="{pig.photos}" pig_name="{pig.name}" {pig_status}>
	<PigProfile {overseer} {city} {pig_status_id} status={status_picture} {pic} {pig_name} {pig_status} {age} {pig_sex} {redirect_to_edit} id={pig_id} {admin} bind:modal_opened={modal_opened}
				bind:status_value={status_value} bind:action={action}/>
</Article>
{/key}

<VKCommunityMessages />

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
