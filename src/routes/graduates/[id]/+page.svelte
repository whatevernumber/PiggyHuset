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
	let pig = data.pig;
	let pig_id = pig.id;
	let pig_name = pig.name;
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

	if (graduated === 2) {
		pig.status.text = (pig_sex === 'M' ? 'нашёл' : 'нашла') + ' дом';
	}

	let status_picture; // для отображения картинки статуса выпусника;

	switch (graduated) {
		case 2:
			break;
		case 3:
			status_picture = 'rainbow';
			break;
		case 4:
			status_picture = 'taken';
			break;
	}

	let admin = false;

	let modal_opened = false;
	let action = 'change';
	let status_value;
	let success = false;

	const UNAVAILABLE_STATUSES = [2, 3, 4];
	$: pig_status_id = pig.status_id;

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

		if ((UNAVAILABLE_STATUSES.includes(parseInt(status_value)) && UNAVAILABLE_STATUSES.includes(pig_status_id))) {
			action = 'complete';
			pig_status_id = parseInt(status_value);

			// Обновление иконки статуса в зависимости от изменений
			if (pig_status_id === 3) {
				status_picture = 'rainbow';
			} else if (pig_status_id === 4) {
				status_picture = 'taken'
			} else if (pig_status_id === 2) {
				status_picture = 'graduated'
			}
		} else {
			action = 'sent';
		}
	}

	const redirect_after_graduate = () => {
		if (action === 'sent') {
			redirect(`/looking-for-home/${pig_id}`, 100);
		}
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
			} else {
				action = 'change_fail'
			}
		}
	}
</script>

<svelte:head>
	<title>{pig_name ? pig_name + ' ' + pig_status : 'Свинка'}</title>
</svelte:head>

{#key pig_status_id}
<Article {date} {text} photos="{pig.photos}" type="graduate">
	<PigProfile {city} {overseer} {graduated} {graduation_date} {pig_sex} {pig_status} {pig_status_id} status={status_picture} {taken} {rainbow} {pic} {pig_name} {age} {type} {redirect_to_edit} {admin}
				bind:modal_opened={modal_opened} bind:status_value={status_value} bind:action={action} />
</Article>
{/key}

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