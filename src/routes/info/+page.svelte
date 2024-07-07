<script>

import Search from '$lib/components/misc/search/Search.svelte';
import Card from '$lib/components/cards/Card.svelte';
import CardList from '$lib/components/lists/CardList.svelte';
import ModalOkay from '$lib/components/misc/modal/ModalOkay.svelte';
import SmolButton from '$lib/components/misc/button/SmolButton.svelte';
import { closeModal, removeData, showModal } from '$lib/components/utils/func.js';
import Overlay from '$lib/components/misc/overlay/Overlay.svelte';
import LinkWithReferrer from '$lib/components/misc/links/LinkWithReferrer.svelte';
import BigHeader from '$lib/components/misc/h-headers/BigHeader.svelte';

export let data;
let results = data.info;

let searchWord = '';
let resultWord;
let filter_id = null;
let screen_width;

const search = async () => {

	let res;

	if (!filter_id && !searchWord) {
		res = await fetch('/api/info/all');
	} else {
		res = await fetch('/api/info?q=' + searchWord + (filter_id ? '&type=' + filter_id : ''))
	}

	resultWord = searchWord;
	return res.ok ? await res.json() : [];
}

const searchData = async () => {
	results = search();
}

const filterCategory = async (id) => {
	filter_id = id;
	searchWord = '';
	results = search();
}

// for modal-delete form
let action;
let modal_opened;
let desc;
let success;
let action_id;

const show_delete = (evt) => {
	action = 'delete';
	showModal(evt);
	evt.target.removeEventListener('click', show_delete);
	document.removeEventListener('click', closeModal);

	modal_opened = true;
}

// Обработка действия кнопки "отменить" при удалении
const handle_cancel = (evt) => {
	closeModal(evt);
	modal_opened = false;
}

async function remove () {
	desc = 'Идёт удаление, подождите...';

	success = await removeData('food', action_id);
	if (success) {
		action = 'complete';
		desc = 'Удаление успешно!';
		results = search();
	} else {
		action = 'fail';
		desc = 'Произошла ошибка. Попробуйте повторить позднее.';
	}
}

</script>

<svelte:window bind:innerWidth={screen_width} />

<svelte:head>
	<title>База знаний</title>
</svelte:head>

<div class="wrapper">
	<BigHeader text_content="ЧТО ЕДЯТ СВИНКИ" class_name="smaller-margin" />
	<Search bind:searchWord onclick={searchData} rounded />
	<div class="query_wrapper">
		{#if resultWord}
			<p class="query_text">Результаты по запросу: <b>{resultWord}</b></p>
		{/if}
	</div>
	{#if data.categories && data.categories.length}
	<div class="filters">
		<ul class="list">

			<li class="list-option list-reset" on:click={() => filterCategory(null)}>Сбросить</li>

			{#each data.categories as category}
				<li class="list-option {filter_id === category.id ? 'active' : ''}" on:click={() => filterCategory(category.id)}>{ category.value }</li>
			{/each}

		</ul>
	</div>
	{/if}

	{#if data.authorized}
		<div class="button_wrapper">
			<LinkWithReferrer href="/admin/info/add">
				<SmolButton class_name="smol-green" title="Добавить" />
			</LinkWithReferrer>

			<LinkWithReferrer href="/admin/info">
				<SmolButton title="Статистика" />
			</LinkWithReferrer>
		</div>
	{/if}

	{#await results}
		<div class="result-wrapper" style="place-self: center;">
			<p>Ищем ваш запрос...</p>
			<img src="/img/pig-search.png" width="150px" height="150px" alt="Свинка ищет слово" />
		</div>
	{:then results}
		{#if results && results.length}
			<div class="result-wrapper">
				<CardList>
					{#each results as card (card.id)}
						<li class="result-item">
							<Card is_article type="info" article={card} admin={data.authorized} delete_handler={show_delete} bind:id={action_id} bind:desc rounded={screen_width < 1001} />
						</li>
					{/each}
				</CardList>
			</div>
		{:else}
			<div class="result-wrapper">
				<img src="/img/await-search.png" width="150px" height="150px" alt="Свинка ищет слово"/>
				<p class="not-found">Мы искали, но ничего не нашли :c</p>
			</div>
		{/if}
	{/await}
</div>

{#if modal_opened}
	<Overlay />
{/if}


<div class="modal modal_closed">
	<ModalOkay {desc} {action} {success} {handle_cancel} action_handler={remove} bind:modal_opened={modal_opened} />
</div>

<style>
	.wrapper {
		margin: 20px auto;
		display: flex;
		flex-direction: column;
		flex-grow: 1;
	}

	.query_wrapper {
		margin: 10px auto;
	}

	.result-wrapper {
		text-align: center;
		flex-grow: 1;
		place-content: center;
		max-width: 40vw;
	}

	.result-item {
		text-align: left;
	}

	.list {
		padding: 0;
		display: flex;
		column-gap: 15px;
		row-gap: 10px;
		flex-wrap: wrap;
		list-style: none;
		justify-content: center;
	}

	.list-option {
		padding: 7px;
		border: 1px dashed #3f3f3f;
		border-radius: 25px;
	}

	.list-option:hover {
		color: #d97544;
		cursor: pointer;
	}

	.list-reset {
		color: #b25f36;
	}

	.list-reset:hover {
		background-color: rgba(246, 181, 211, 0.6);
	}

	.active {
		border-style: solid;
		border-color: #d97544;
		background-color: #f0f6e6;
	}

	.button_wrapper {
		display: flex;
		justify-content: flex-end;
		column-gap: 15px;
		margin-bottom: 20px;
	}

	.not-found {
		font-size: 18px;
		font-style: italic;
	}

	@media (max-width: 1001px) {
		.query_wrapper {
			text-align: center;
		}

        .result-item {
            width: 90vw;
            margin-left: 5vw;
        }
    }

    .modal {
        position: fixed;
        top: 35%;
        left: 30%;
        z-index: 3;
    }

    .modal_closed {
        display: none;
    }
</style>

