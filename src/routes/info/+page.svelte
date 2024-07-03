<script>

import Search from '$lib/components/misc/search/Search.svelte';
import Card from '$lib/components/cards/Card.svelte';
import CardList from '$lib/components/lists/CardList.svelte';
import ModalOkay from '$lib/components/misc/modal/ModalOkay.svelte';
import SmolButton from '$lib/components/misc/button/SmolButton.svelte';
import { goto } from '$app/navigation';
import { closeModal, removeData, showModal } from '$lib/components/utils/func.js';
import Overlay from '$lib/components/misc/overlay/Overlay.svelte';

export let data;
let results = data.info;

let searchWord = '';
let resultWord;
let filter_id = null;

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
		results = results.filter(i => i.id !== action_id);
		desc = 'Удаление успешно!';
	} else {
		action = 'fail';
		desc = 'Произошла ошибка. Попробуйте повторить позднее.';
	}
}

</script>

<svelte:head>
	<title>База знаний</title>
</svelte:head>

<div class='wrapper'>
	<Search bind:searchWord onclick={searchData} />
	<div class='query_wrapper'>
		{#if resultWord}
			<p class='query_text'>Результаты по запросу: <b>{resultWord}</b></p>
		{/if}
	</div>
	<div>
		{#if data.categories && data.categories.length}
		<div class='filters'>
			<ul class='list'>
				<li class='list-option list-reset' on:click={() => filterCategory('')}>Сбросить</li>
				{#each data.categories as category}
					<li class="list-option {filter_id === category.id ? 'active' : ''}" on:click={() => filterCategory(category.id)}>{ category.value }</li>
				{/each}
			</ul>
		</div>
		{/if}
		{#if data.authorized}
		<div class='button_wrapper'>
			<SmolButton class_name='smol-green' title='Добавить' click_handler={() => {goto('/admin/info/add')}} />
			<SmolButton title='Статистика' click_handler={() => {goto('/admin/info')}} />
		</div>
		{/if}
		{#await results}
			<div class='result-wrapper'>
				<p>Свинка ищет ваш запрос...</p>
				<img src='/img/pig-search.jpg' width='150px' height='150px' alt='Свинка ищет слово'/>
			</div>
		{:then results}
			{#if results && results.length}
				<CardList>
					{#each results as card (card.id)}
						<li>
							<Card is_article type='info' article={card} admin={data.authorized} delete_handler={show_delete} bind:id={action_id} bind:desc />
						</li>
					{/each}
				</CardList>
			{:else}
				<div class='result-wrapper'>
					<p>Нет результатов :c</p>
					<img src='/img/await-search.jpg' width='150px' height='150px' alt='Свинка ищет слово'/>
				</div>
			{/if}
		{/await}
	</div>
</div>

{#if modal_opened}
	<Overlay />
{/if}


<div class='modal modal_closed'>
	<ModalOkay {desc} {action} {success} {handle_cancel} action_handler={remove} bind:modal_opened={modal_opened} />
</div>

<style>
	.wrapper {
		margin: 20px auto;
	}

	.query_wrapper {
		margin: 10px auto;
	}

	.result-wrapper {
		text-align: center;
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

	.list-option:hover {
		color: #EF8653;
	}

	.list-reset {
		color: #d97544;
	}

	.active {
		color: #88aa4d;
	}

	.button_wrapper {
		display: flex;
		justify-content: flex-end;
		column-gap: 15px;
		margin-bottom: 20px;
	}

	@media (max-width: 1001px) {
		.query_wrapper {
			text-align: center;
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

