<script>
	import Paginator from '$lib/components/misc/paginator/Paginator.svelte';
	import ReturnButton from '$lib/components/misc/button/ReturnButton.svelte';

	export let data;
	$: queries = data.stats;

	let filter = 'all';
	let sort_option = 'date';

	const loadNewPage = async (page) => {
		const res = await fetch('/api/queries?filter=' + filter + (sort_option ? '&sort=' + sort_option : '') + '&page=' + page);
		data.stats = await res.json();
	}

	const handleSortOrFilter = (type, value) => {
		if (type === 'sort') {
			sort_option = value;
		}

		if (type === 'filter') {
			filter = value;
		}

		loadNewPage(1);
	}

</script>

<svelte:head>
	<title>Статистика запросов</title>
</svelte:head>

<div class="page_wrapper">
	<h1 class="header">Статистика</h1>
	<div class="filter_wrapper">
		<div class="filter_list">
			<span class="filter_option {filter === 'all' ? 'active' : '' }" on:click={() => handleSortOrFilter("filter", "all")}>
				Все
			</span>
			<span class="filter_option {filter === 'failed' ? 'active' : '' }" on:click={() => handleSortOrFilter("filter", "failed")}>
				Неудачные
			</span>
		</div>
		<div>
			<ul class="sort_list">
				<li class="sort_option {sort_option === 'date' ? 'active' : '' }" on:click={() => {handleSortOrFilter('sort', 'date')}}>
					По дате
				</li>
				<li class="sort_option {sort_option === 'count' ? 'active' : '' }" on:click={() => {handleSortOrFilter('sort', 'count')}}>
					По количеству запросов
				</li>
				<li class="sort_option {sort_option === 'id' ? 'active' : '' }" on:click={() => {handleSortOrFilter('sort', 'id')}}>
					По порядку
				</li>
			</ul>
		</div>
	</div>
	<table class="table">
		<thead>
			<tr>
				<th>ID</th>
				<th>Запрос</th>
				<th>Счётчик</th>
				<th>Успешно</th>
				<th>Последний запрос</th>
			</tr>
		</thead>
		<tbody>
		{#await queries}
		{:then queries}
			{#if queries && queries.payload.length}
				{#each queries.payload as stat}
			<tr>
				<td>{stat.id}</td>
				<td class:failed={stat.failed}>{stat.value}</td>
				<td>{stat.count}</td>
				<td class:failed={stat.failed}>{stat.failed ? 'Нет' : 'Да'}</td>
				<td>{stat.updated_at}</td>
			</tr>
				{/each}
			{:else}
				<p class="no_results">Нет результатов!</p>
			{/if}
		{/await}
		</tbody>
	</table>

	{#if queries.pagination.pageCount > 1}
		<div class="paginator_wrapper">
			<Paginator bind:data={queries} current_page={queries.pagination.page + 1} page_count={queries.pagination.pageCount} loadFunc={loadNewPage}/>
		</div>
	{/if}
</div>

<ReturnButton />

<style>
	.header {
		text-align: center;
		margin-bottom: 15px;
	}

	.page_wrapper {
		display: flex;
		flex-direction: column;
		row-gap: 10px;
		justify-content: center;
		align-items: center;
		margin-bottom: 20px;
	}

	.table {
		min-width: 70%;
		max-width: 95vw;
		border: 1px solid #adadad;
        border-collapse: collapse;
	}

	tr, td {
		text-align: center;
		border: 1px solid #adadad;
	}

	td:nth-child(odd) {
		background-color: #FFFFFF;
	}

    td:nth-child(even) {
		background-color: #e1edce;
    }

	td:nth-child(even).failed {
		background-color: rgba(63, 63, 63, 0.25);
	}

	.sort_list {
		padding: 0;
		display: flex;
		justify-content: center;
		column-gap: 10px;
		flex-wrap: wrap;
		list-style: none;
	}

	.sort_option:hover, .filter_option:hover {
		color: #f5b193;
	}

	.sort_option.active {
        color: #F6B5D3;
	}
	
	.filter_option, .sort_option {
        cursor: pointer;
	}

	.filter_option.active {
		color: rgba(255, 85, 22, 0.87);
	}

	.filter_wrapper {
		min-width: 70%;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.filter_list {
		display: flex;
        column-gap: 10px;
	}

	.no_results {
		position: absolute;
		font-size: 18px;
		color: #d97544;
	}

	@media (max-width: 1024px) {
		.filter_list {
			flex-direction: column;
			row-gap: 5px;
			order: 5;
		}

		.sort_list {
			flex-direction: column;
			order: -2;
		}

		th {
			border: 1px solid #3f3f3f;
		}
	}
</style>