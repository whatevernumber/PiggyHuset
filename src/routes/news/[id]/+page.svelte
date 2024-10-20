<script>
	import Article from '$lib/components/articles/Article.svelte';
	import ModalOkay from '$lib/components/misc/modal/ModalOkay.svelte';
	import { showModal, removeData, closeModal, redirect } from '$lib/components/utils/func.js';
	import CardMainContent from '$lib/components/cards/CardMainContent.svelte';
	import SmolButton from '$lib/components/misc/button/SmolButton.svelte';
	import PhotoCard from '$lib/components/photo-card/PhotoCard.svelte';
	import Overlay from '$lib/components/misc/overlay/Overlay.svelte';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	export let data;

	let news = data.news;
	let header = news.title;
	let text = news.text;
	let date = news.datetime;

	let action;
	let success;
	let modal_opened = false;
	let admin = false;
	let desc; // текст для модального окна

	onMount(() => {
		admin = data.authorized;
	})

	const show_delete = (evt) => {
		action = 'delete';
		desc = `Вы собираетесь удалить запись "${news.title}". Это действие необратимо!`;
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
		desc = 'Идёт удаление, подождите...';

		success = await removeData('articles', news.id);
		if (success) {
			action = 'card_delete';
			desc = 'Удаление успешно!';
		} else {
			action = 'fail';
			desc = 'Произошла ошибка. Попробуйте повторить позднее.';
		}
	}

	const redirect_to_list = (tag) => {
		goto('/news?tag=' + tag);
	}
</script>

<svelte:head>
	<meta name="description" content={header + ' - Новости от Домик для бездомных поросят'} />
	<title>{header}</title>
</svelte:head>

<Article class_name="article_news" {date} text="{text}" type="news">
	{#if news.main_photo}
		<PhotoCard type="article" pic={news.main_photo} />
	{/if}
	{#if admin}
		<div class="profile_buttons">
			<SmolButton class_name="super-smol-button" title="Изменить" click_handler={redirect_to_edit} />
			<SmolButton class_name="super-smol-button" title="Удалить" click_handler={show_delete} />
		</div>
	{/if}

	<div class="wrapper">
		<CardMainContent is_article {header} {text} />
	</div>

	{#if news?.tags}
		<ul class="tag_list">
			{#each news.tags as tag}
				<li>
					<span on:click={() => redirect_to_list(tag.tag_value)} role="button">
						#{tag.tag_value}
					</span>
				</li>
			{/each}
		</ul>
	{/if}
</Article>

{#if modal_opened}
	<Overlay />
{/if}

<div class='modal modal_closed'>
	<ModalOkay {action} action_handler={remove} {success} {handle_cancel} redirect={redirect_after_success} bind:modal_opened={modal_opened}
		   {desc}
	/>
</div>

<style>
    .wrapper {
        display: flex;
        column-gap: 15px;
    }

    .modal {
        position: absolute;
        top: 35%;
        left: 30%;
        z-index: 10;
    }

    .tag_list {
        display: flex;
        column-gap: 5px;
        cursor: pointer;
        list-style: none;
		order: 4;
    }

    .tag_list span {
        text-transform: lowercase;
        color: rgba(197, 205, 158, 0.87);
    }

    .tag_list span:hover {
        color: #EF8653;
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