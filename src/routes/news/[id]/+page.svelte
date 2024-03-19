<script>
	import Article from '$lib/components/articles/Article.svelte';
	import PhotoList from '$lib/components/photo-list/PhotoList.svelte';
	import ModalOkay from '$lib/components/misc/modal/ModalOkay.svelte';
	import { showModal, removeData, closeModal, redirect } from '$lib/components/utils/func.js';
	import CardMainContent from '$lib/components/cards/CardMainContent.svelte';
	import SmolButton from '$lib/components/misc/button/SmolButton.svelte';
	import PhotoCard from '$lib/components/photo-card/PhotoCard.svelte';
	import Overlay from '$lib/components/misc/overlay/Overlay.svelte';
	import { _ADMIN_FLAG } from '$env/static/public';
	import { onMount } from 'svelte';

	export let data;

	let news = data.news;
	let header = news.title;
	let text = news.text;
	let date = news.datetime;

	let action;
	let success;
	let modal_opened = false;
	let admin = false;

	onMount(() => {
		admin = localStorage.getItem(_ADMIN_FLAG);
	})

	const show_delete = (evt) => {
		action = 'delete';
		document.querySelector('.message').innerHTML = `Вы собираетесь удалить запись "${news.title}". Это действие <b>необратимо</b>`;
		showModal(evt, 'modal_closed');
		evt.target.removeEventListener('click', show_delete);
		document.removeEventListener('click', closeModal);

		// Флаг оверлея для блокировки содержимого за модальным окном
		modal_opened = true;
	}

	// Обработка действия кнопки "отменить" при удалении
	const handle_cancel = (evt) => {
		closeModal(evt);

		// Снятие оверлея
		modal_opened = false;
	}

	const redirect_after_success = () => {
		redirect('/news', 300);
	}

	const redirect_to_edit = () => {
		redirect('/admin/edit/article/' + news.id, 250);
	}

	async function remove () {
		let message = document.querySelector('.message');
		message.textContent = 'Идёт удаление, подождите...';

		success = await removeData('articles', news.id);
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

<Article class_name='article_news' {date} text="{text}" type="news">
	<div class="wrapper">
		<div>
			<PhotoCard pic={news.main_photo} type="article" />
			{#if admin}
				<div class="profile_buttons">
					<SmolButton class_name="super-smol-button" title="Изменить" click_handler={redirect_to_edit} />
					<SmolButton class_name="super-smol-button" title="Удалить" click_handler={show_delete} />
				</div>
			{/if}
		</div>
		<CardMainContent is_article {header} {text} />
	</div>

	{#if news.photos.length > 1}
	<PhotoList photos={news.photos} />
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

        .modal {
            left: 0;
        }
	}
</style>