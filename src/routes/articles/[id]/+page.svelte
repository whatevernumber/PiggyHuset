<script>
	import Article from '$lib/components/articles/Article.svelte';
	import CardMainContent from '$lib/components/cards/CardMainContent.svelte';
	import PhotoCard from '$lib/components/photo-card/PhotoCard.svelte';
	import PhotoList from '$lib/components/photo-list/PhotoList.svelte';
	import SmolButton from '$lib/components/misc/button/SmolButton.svelte';
	import ModalOkay from '$lib/components/misc/modal/ModalOkay.svelte';
	import { showModal, removeData, closeModal, redirect } from '$lib/components/utils/func.js';
	import Overlay from '$lib/components/misc/overlay/Overlay.svelte';
	import { _ADMIN_FLAG } from '$env/static/public';
	import { onMount } from 'svelte';

	export let data;

	const article = data.article;
	const pic = article.main_photo;
	const header = article.title;
	const text = article.text;
	const author = article.author;

	let window_width;
	let action;
	let success = false;
	let modal_opened = false;
	let admin = false;

	onMount(() => {
		admin = localStorage.getItem(_ADMIN_FLAG);
	})

	const show_delete = (evt) => {
		action = 'delete';
		document.querySelector('.message').innerHTML = `Вы собираетесь удалить запись "${article.title}". Это действие <b>необратимо</b>`;
		showModal(evt, 'modal_closed');
		evt.target.removeEventListener('click', show_delete);
		document.removeEventListener('click', closeModal);

		// Оверлей для блокировки содержимого за модальным окном
		modal_opened = true;
	}

	// Обработка действия кнопки "отменить" при удалении
	const handle_cancel = (evt) => {
		closeModal(evt);

		// Флаг для снятия оверлея
		modal_opened = false;
	}

	const redirect_after_success = () => {
		redirect('/articles', 300);
	}

	const redirect_to_edit = () => {
		redirect('/admin/edit/article/' + article.id, 250);
	}

	async function remove () {
		let message = document.querySelector('.message');
		message.textContent = 'Идёт удаление, подождите...';

		success = await removeData('articles', article.id);
		if (success) {
			action = 'card_delete';
			message.textContent = 'Удаление успешно!';
		} else {
			action = 'fail';
			message.textContent = 'Произошла ошибка. Попробуйте повторить позднее.';
		}
	}
</script>

<svelte:head>
	<title>{header}</title>
</svelte:head>

<svelte:window bind:innerWidth={window_width} />

<Article date="{article.datetime}" {text}>
		<div class="wrapper">
			<div class="photo-card-wrapper" class:absolute={article.type_id === 1}>
				{#if (window_width > 1000)}
					<PhotoCard {pic} width="200" type="article" />
				{/if}
				{#if admin}
				<div class="profile_buttons">
					<SmolButton class_name="super-smol-button" title="Изменить" click_handler={redirect_to_edit} />
					<SmolButton class_name="super-smol-button" title="Удалить" click_handler={show_delete} />
				</div>
				{/if}
			</div>
			<CardMainContent is_article {header} {author} type="{article.type_id}" />
		</div>
		{#if article.photos.length > 1 && article.type_id !== 1}
			<PhotoList photos={article.photos} />
		{/if}
</Article>

{#if modal_opened}
	<Overlay />
{/if}

<div class='modal modal_closed'>
	<ModalOkay {action} action_handler={remove} {success} {handle_cancel} redirect={redirect_after_success} bind:modal_opened={modal_opened} />
</div>

<style>
	.wrapper {
		display: flex;
		column-gap: 15px;
	}

    .profile_buttons {
        display: flex;
        max-width: 200px;
		margin-top: 5px;
        justify-content: space-between;
    }

	.modal {
		position: absolute;
		top: 35%;
		left: 30%;
		z-index: 10;
	}

	.photo-card-wrapper {
		height: min-content;
	}

	.photo-card-wrapper .absolute {
        position: absolute;
	}

    @media (max-width: 1001px) {
        .wrapper {
            flex-direction: column;
            row-gap: 10px;
            margin-top: 10px;
        }

        .profile_buttons {
            justify-self: center;
            margin: 5px auto;
        }

		.photo-card-wrapper.photo-card-wrapper {
			position: static;
		}

        .modal {
            left: 0;
        }
    }
</style>
