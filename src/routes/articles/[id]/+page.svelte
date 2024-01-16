<script>
	import Article from '$lib/components/articles/Article.svelte';
	import CardDescription from '$lib/components/cards/CardDescription.svelte';
	import PhotoCard from '$lib/components/photo-card/PhotoCard.svelte';
	import PhotoList from '$lib/components/photo-list/PhotoList.svelte';
	import SmolButton from '$lib/components/misc/button/SmolButton.svelte';
	import ModalOkay from '$lib/components/misc/modal/ModalOkay.svelte';
	import { showModal, removeData, closeModal } from '$lib/components/utils/func.js';

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
		document.querySelector('.message').innerHTML = `Вы собираетесь удалить статью "${header}". Это действие <b>необратимо</b>`;
		showModal(evt, 'modal_delete');
		evt.target.removeEventListener('click', show_delete);
		document.removeEventListener('click', closeModal);
	}

	const remove = () => {
		removeData('article', article.id, success);

		if (success) {
			action = 'complete';
		} else {
			action = 'fail';
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
					<SmolButton class_name="super-smol-button" title="Изменить" />
					<SmolButton class_name="super-smol-button" title="Удалить" click_handler={show_delete} />
				</div>
				{/if}
			</div>
			<CardDescription article {header} {description} {author} />
		</div>
		{#if article.photos.length}
			<PhotoList photos={article.photos} />
		{/if}
</Article>

<div class='modal modal_delete modal_closed'>
	<ModalOkay {action} action_handler={remove} {success} />
</div>

<style>

	.wrapper {
			display: flex;
			column-gap: 15px;
	}

	.photo-wrapper {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}

    .date {
        align-self: flex-end;
        font-style: italic;
        color: #adadad;
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
</style>