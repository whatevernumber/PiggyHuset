<script>
	export let title = 'Отправить';
    export let on_click = null;
</script>

<button class="form-button" type="button" on:click={on_click}>{title}</button>

<style>
	.form-button {
		max-width: 112px;
		padding: 8px 15px;
		background-color: #d97544;
		border: none;
		font-family: Jost, Arial, sans-serif;
		font-size: 14px;
		text-transform: uppercase;
		color: #FFFFFF;
		text-align: center;
	}

	.form-button:hover {
		background-color: #EF8653;
	}

	.form-button:focus {
		background-color: #B25F36;
	}
</style>