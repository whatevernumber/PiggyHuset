<script>
	export let searchWord;
	export let onclick;

	const handle_form = (evt) => {
		evt.preventDefault();
		onclick();
	}
</script>

<form class='search_wrapper'>
	<input class='search_input' bind:value={searchWord}  placeholder='Например, овощи'>
	<button class='search_button' on:click={handle_form}>
	</button>
</form>

<style>
	.search_wrapper {
		display: flex;
		column-gap: 5px;
		margin: auto;
		width: 600px;
	}

	.search_button {
		outline: none;
		border: solid 1px #f5b193;
		width: 50px;
		height: 50px;
		align-items: center;
		background-image: url("/img/search_button_icon.jpg");
		background-size: contain;
		transition: all 500ms ;
	}

	.search_button:hover {
		outline: solid 2px #F6B5D3;
	}

	.search_input {
        padding: 10px 10px;
        height: 25px;
        width: 500px;
        max-width: 780px;
        border-color: #f6b5d3;
        font-family: Jost, Arial, sans-serif;
        font-size: 18px;
	}

	@media (max-width: 1024px) {
        .search_wrapper {
            width: 300px;
        }

        .search_input {
            width: 200px;
        }
    }
</style>