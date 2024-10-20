<script>
	import Article from '$lib/components/articles/Article.svelte';
	import CardMainContent from '$lib/components/cards/CardMainContent.svelte';
	import SmolButton from '$lib/components/misc/button/SmolButton.svelte';
	import ModalOkay from '$lib/components/misc/modal/ModalOkay.svelte';
	import { showModal, removeData, closeModal, redirect } from '$lib/components/utils/func.js';
	import Overlay from '$lib/components/misc/overlay/Overlay.svelte';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import PhotoCard from '$lib/components/photo-card/PhotoCard.svelte';

	export let data;

	const article = data.article;
	const header = article.title;
	const text = article.text;
	const author = article.author;
	const source = article.origin_link;

	let window_width;
	let action;
	let success = false;
	let modal_opened = false;
	let admin = false;
	let desc;

	onMount(() => {
		admin = data.authorized;
	})

	const show_delete = (evt) => {
		action = 'delete';
		desc = `Вы собираетесь удалить запись "${article.title}". Это действие необратимо!`;
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
		desc = 'Идёт удаление, подождите...';

		success = await removeData('articles', article.id);
		if (success) {
			action = 'card_delete';
			desc = 'Удаление успешно!';
		} else {
			action = 'fail';
			desc = 'Произошла ошибка. Попробуйте повторить позднее.';
		}
	}

	const redirect_to_list = (tag) => {
		goto('/articles?tag=' + tag);
	}
</script>

<svelte:head>
	<meta name="description" content={header + '. Всё, что вы хотели знать о морских свинках, можно узнать в нашей статье'} />
	<title>{header} - Статьи от Домик для бездомных поросят</title>
</svelte:head>

<svelte:window bind:innerWidth={window_width} />

<Article date="{article.datetime}" {text}>
	{#if article.main_photo}
		<PhotoCard type="article" pic={article.main_photo} />
	{/if}
	{#if admin}
		<div class="profile_buttons">
			<SmolButton class_name="super-smol-button" title="Изменить" click_handler={redirect_to_edit} />
			<SmolButton class_name="super-smol-button" title="Удалить" click_handler={show_delete} />
		</div>
	{/if}

	<div class="wrapper">
		<CardMainContent is_article {header} {author} type="{article.type_id}" {admin} />
	</div>

	{#if source}
		<div class="source">
		<p class="article_source"><b>Источник:</b> <i style="color: forestgreen">{source}</i></p>
		</div>
	{/if}

	{#if article?.tags}
		<ul class="tag_list">
			{#each article.tags as tag}
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

<div class="modal modal_closed">
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

	.source {
		order: 10;
		margin-bottom: 25px;
	}

	.photo-card-wrapper {
		height: min-content;
	}

	.photo-card-wrapper .absolute {
        position: absolute;
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

		.photo-card-wrapper.photo-card-wrapper {
			position: static;
		}

        .modal {
            left: 0;
        }
    }
</style>
