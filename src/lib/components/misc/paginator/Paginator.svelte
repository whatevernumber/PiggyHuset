<script>
	export let data;
	export let current_page;
	export let page_count;
	export let loadFunc;

</script>

<ul class='pagination_list'>
	{#if current_page !== 1}
	<li class='pagination_item' on:click={() => {loadFunc(current_page - 1)}}>
		{current_page - 1}
	</li>
	{/if}
	<li class='pagination_item pagination_current'>
		{current_page}
	</li>
	{#if current_page !== page_count}
	<li class='pagination_item' on:click={() => {loadFunc(current_page + 1)}}>
		{current_page + 1}
	</li>
	{/if}
</ul>

<style>
	.pagination_list {
		display: flex;
		column-gap: 5px;
		padding: 0;
		list-style: none;
	}

    .pagination_item {
		padding: 5px 10px;
		cursor: pointer;
		background-color: #e1edce;
	}

	.pagination_item:hover {
		background-color: #88aa4d;
	}

	.pagination_item.pagination_current {
		background-color: #adadad;
		color: #F6B5D3;
	}

    .pagination_item.pagination_current:hover {
        background-color: #adadad;
    }
</style>

