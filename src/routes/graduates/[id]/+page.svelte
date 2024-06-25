<script>
	import Article from '$lib/components/articles/Article.svelte';
	import PigProfile from '$lib/components/cards/pig-profile-card/PigProfile.svelte';
	import {closeModal, redirect} from '$lib/components/utils/func.js';
	import {onMount} from 'svelte';
	import Overlay from '$lib/components/misc/overlay/Overlay.svelte';
	import ModalOkay from '$lib/components/misc/modal/ModalOkay.svelte';

	export let data;

	const type = 'ready';
	let pig = data.pig;
	let pig_id = pig.id;

	const taken = pig.taken;
	const rainbow = pig.rainbow;

	let pig_status = pig.status ? pig.status.text : '';

	let status_picture; // для отображения картинки статуса выпусника;

	switch (pig.status.id) {
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

	let desc = 'Вы собираетесь изменить статус свинки';

	onMount(() => {
		admin = data.authorized;
	})

	const redirect_to_edit = () => {
		redirect('/admin/edit/pig/' + pig.id);
	}

	const cancel = (evt) => {
		modal_opened = false;
		closeModal(evt);
	}

	const graduate_handler = () => {
		graduate_pig(status_value);

		if ((UNAVAILABLE_STATUSES.includes(parseInt(status_value)) && UNAVAILABLE_STATUSES.includes(pig_status_id))) {
			action = 'complete';
			pig_status_id = parseInt(status_value);

			// Обновление иконки и текста статуса в зависимости от изменений
			if (pig_status_id === 3) {
				status_picture = 'rainbow';
				pig_status = 'на радуге';
			} else if (pig_status_id === 4) {
				status_picture = 'taken'
				pig_status = 'зажаблено';
			} else if (pig_status_id === 2) {
				status_picture = 'graduated'
				pig_status = 'в новом доме';
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

	async function graduate_pig (value) {
		const res = await fetch('/api/pigs/graduate?id=' + pig.id + '&value=' + value, {
			method: 'PATCH',
		});

		if (res.ok) {
			document.querySelector('.message').innerHTML = `Статус успешно изменён`;
			success = true;
			desc = 'Успешно';
		} else {
			action = 'change_fail';
			desc = 'Произошла ошибка';
		}
	}
</script>

<svelte:head>
	<title>{pig.name ? pig.name + ' ' + pig_status : 'Свинка'}</title>
</svelte:head>

{#key pig_status_id}
<Article date={pig.datetime} text={pig.description} photos="{pig.photos}" type="graduate">
	<PigProfile {pig} {pig_status} {pig_status_id} status={status_picture} {type} {redirect_to_edit} {admin}
				bind:modal_opened={modal_opened} bind:status_value={status_value} bind:action={action} />
</Article>
{/key}

{#if modal_opened}
	<Overlay />
{/if}

<div class='modal modal_closed'>
	<ModalOkay {action} action_handler={graduate_handler} {success} handle_cancel={cancel} sent_handle={redirect_after_graduate} bind:modal_opened={modal_opened}
		   {desc}
	/>
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