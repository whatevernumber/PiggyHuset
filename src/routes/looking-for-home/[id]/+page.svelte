<script>
	import Article from '$lib/components/articles/Article.svelte';
	import PigProfile from '$lib/components/cards/pig-profile-card/PigProfile.svelte';
	import { showModal, closeModal, redirect } from '$lib/components/utils/func.js';
	import ModalOkay from '$lib/components/misc/modal/ModalOkay.svelte';
	import Overlay from '$lib/components/misc/overlay/Overlay.svelte';
	import { onMount } from 'svelte';
	import VKCommunityMessages from "$lib/components/widgets/VKCommunityMessages.svelte";
	export let data;

	let pig = data.pig;
	let admin = false;

	let modal_opened = false;
	let action = 'change';
	let status_value; // Выбранное в чекбоксе id статуса, изменяется при действии 'Graduate'
	let success = false;
	let pig_status = pig.status ? pig.status.text : ''; // Текущий статус свинки;
	let status_picture = pig.status.value; // Для отображения мини-картинки статуса для Карантина

	const AVAILABLE_STATUSES = [1, 5, 6];
	$: pig_status_id = pig.status_id;

	let desc = 'Вы собираетесь изменить статус свинки';

	onMount(() => {
		admin = data.authorized;
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
		graduate_pig(status_value);

		if ((AVAILABLE_STATUSES.includes(parseInt(status_value)) && AVAILABLE_STATUSES.includes(pig_status_id))) {
			action = 'complete';
			pig_status_id = parseInt(status_value);
			status_picture = null;

			if (pig_status_id === 6) {
				status_picture = 'quarantine';
				pig_status = 'на карантине';
			} else if (pig_status_id === 5) {
				pig_status = 'на резерве'
			}
		} else {
			action = 'sent';
		}
	}

	const redirect_after_graduate = () => {
		if (action === 'sent') {
			redirect(`/graduates/${pig.id}`, 100);
		}
	}

	const cancel = (evt) => {
		modal_opened = false;
		closeModal(evt);
	}

	async function graduate_pig (value) {
		const res = await fetch('/api/pigs/graduate?id=' + pig.id + '&value=' + value, {
			method: 'PATCH',
		});

		if (res.ok) {
			document.querySelector('.message').innerHTML = `Статус успешно изменён`;
			desc = 'Успешно';
			success = true;
		} else {
			action = 'change_fail';
			desc = 'Произошла ошибка';
		}
	}
</script>

<svelte:head>
	<meta name="description" content={(pig.name ?? 'Свинка') + ' ищет новый дом'} />
	<title>{pig.name ?? 'Свинка'}</title>
</svelte:head>

{#key pig_status_id}
<Article date={pig.datetime} text={pig.description} type="pig" photos={pig.photos} pig_name={pig.name} pig_delivery={pig.delivery} {pig_status}>
	<PigProfile {pig} {pig_status_id} status={status_picture} {pig_status} {redirect_to_edit} {admin} bind:modal_opened={modal_opened}
				bind:status_value={status_value} bind:action={action}/>
</Article>
{/key}

<VKCommunityMessages />

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
