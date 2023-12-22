<script>
	export let cols = 50;
	export let autofocus = true;
	export let name = 'text';
</script>

<textarea placeholder="Напишите текст здесь" {autofocus} {cols} {name} required></textarea>

<style>
	textarea {
		min-height: 307px;
		padding: 10px;
		min-width: 780px;
		width: 780px;
		max-width: 780px;
		background-color: #E1EDCE;
		font-family: Jost, Arial, sans-serif;
		font-size: 18px;
		border: none;
	}

	textarea:focus {
		border-color: #EF8653;
	}
</style>