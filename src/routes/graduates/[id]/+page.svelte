<script>
	import Article from '$lib/components/articles/Article.svelte';
	import PigProfile from '$lib/components/cards/pig-profile-card/PigProfile.svelte';
	import {closeModal, include_auth, redirect} from '$lib/components/utils/func.js';
	import {_ADMIN_FLAG, _REMOTE_SERVER, _REST_STORAGE_KEY} from '$env/static/public';
	import {onMount} from 'svelte';
	import Overlay from '$lib/components/misc/overlay/Overlay.svelte';
	import ModalOkay from '$lib/components/misc/modal/ModalOkay.svelte';

	export let data;

	const type = 'ready';
	const pig = data.pig;
	const pic = pig.main_photo;
	const age = pig.age;
	const graduated = pig.status_id;
	const taken = pig.taken;
	const rainbow = pig.rainbow;
	const text = pig.description;
	const date = pig.datetime;
	const graduation_date = pig.graduation_date;
	let city = pig.city.city_name;
	let overseer = pig.overseer ? pig.overseer.overseer_name : null;
	let pig_sex = pig.sex;
	let pig_status = pig.status ? pig.status.text : '';
	let pig_status_id = pig.status ? pig.status.id : '';

	if (graduated === 2) {
		pig.status.text = (pig_sex === 'M' ? 'нашёл' : 'нашла') + ' дом';
	}

	let header = pig.name + ' — ' + pig.status.text;
	let status; // для отображения картинки статуса выпусника;

	switch (graduated) {
		case 2:
			break;
		case 3:
			status = 'rainbow';
			break;
		case 4:
			status = 'taken';
			break;
		default:
			header;
	}

	let admin = false;

	let modal_opened = false;
	let action = 'change';
	let status_value;
	let success = false;

	onMount(() => {
		admin = localStorage.getItem(_ADMIN_FLAG);
	})

	const redirect_to_edit = () => {
		redirect('/admin/edit/pig/' + pig.id);
	}

	const cancel = (evt) => {
		modal_opened = false;
		closeModal(evt);
	}

	const graduate_handler = () => {
		graduatePig(status_value);
	}

	const redirect_after_graduate = () => {
		redirect(`/admin/overview`, 100)
	}

	async function graduatePig (value) {
		const res = await fetch(_REMOTE_SERVER + '/pigs/graduate/' + pig.id + '/' + value, {
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
	<title>{header}</title>
</svelte:head>

<Article {date} {text} photos="{pig.photos}" type="graduate">
	<PigProfile {city} {overseer} {graduated} {graduation_date} {pig_sex} {pig_status} {pig_status_id} {status} {taken} {rainbow} {pic} {header} {age} {type} {redirect_to_edit} {admin} bind:modal_opened={modal_opened} bind:status_value={status_value} />
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