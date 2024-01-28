<script>
	import Article from '$lib/components/articles/Article.svelte';
	import CardDescription from '$lib/components/cards/CardDescription.svelte';
	import PhotoCard from '$lib/components/photo-card/PhotoCard.svelte';
	import PhotoList from '$lib/components/photo-list/PhotoList.svelte';
	import SmolButton from '$lib/components/misc/button/SmolButton.svelte';
	import ModalOkay from '$lib/components/misc/modal/ModalOkay.svelte';
	import { showModal, removeData, closeModal, redirect } from '$lib/components/utils/func.js';
	import Overlay from '$lib/components/misc/overlay/Overlay.svelte';

	export let data;
	let admin = true;

	const article = data.article;
	const pic = article.main_photo;
	const header = article.title;
	const description = article.text;
	const author = article.author;

	let action;
	let success = false;

	const show_delete = (evt) => {
		action = 'delete';
		document.querySelector('.message').innerHTML = `Вы собираетесь удалить запись "${article.title}". Это действие <b>необратимо</b>`;
		showModal(evt, 'modal_delete');
		evt.target.removeEventListener('click', show_delete);
		document.removeEventListener('click', closeModal);

		// Оверлей для блокировки содержимого за модальным окном
		let overlay = document.querySelector('.overlay');
		overlay.style.display = 'block';
	}

	// Обработка действия кнопки "отменить" при удалении
	const handle_cancel = (evt) => {
		closeModal(evt);

		// Снятие оверлея
		let overlay = document.querySelector('.overlay');
		overlay.style.display = 'none';
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

<Article class_name="article_news" date="{article.datetime}">
		<div class="wrapper">
			<div>
				<PhotoCard {pic} type="article" />
				{#if admin}
				<div class="profile_buttons">
					<SmolButton class_name="super-smol-button" title="Изменить" click_handler={redirect_to_edit} />
					<SmolButton class_name="super-smol-button" title="Удалить" click_handler={show_delete} />
				</div>
				{/if}
			</div>
			<CardDescription article {header} {description} {author} />
		</div>
		{#if article.photos.length > 1}
			<PhotoList photos={article.photos} />
		{/if}
</Article>

<Overlay class_name='hidden'/>

<div class='modal modal_delete modal_closed'>
	<ModalOkay {action} action_handler={remove} {success} {handle_cancel} redirect={redirect_after_success} />
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

    .overlay {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(3px);
        z-index: 1;
    }

    .hidden {
        display: none;
    }
</style>