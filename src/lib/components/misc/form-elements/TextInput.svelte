<script>
	export let name = "text_input";
	export let class_name = "text_input"
	export let header
	export let placeholder = "Текст";
	export let width = '780px';
	export let type = 'text';
	export let required = false;
</script>

<label>
	{#if header}
	<span class="input_header">{header}</span>
	{/if}
	<input {type} {required} {name} style="--width: {width};" class="{class_name}" {placeholder}>
	<span class="input-error-label"></span>
</label>

<style>
	label {
		position: relative;
	}

	.text_input {
		padding: 10px 10px;
		height: 25px;
		width: var(--width);
		max-width: 780px;
		border: none;
		background-color: #E1EDCE;
		font-family: Jost, Arial, sans-serif;
		font-size: 18px;
	}

	.input_header {
		position: absolute;
		left: -80px;
		top: 10px;
	}

	@media (max-width: 1001px) {
		.input_header {
			display: none;
		}
    }
</style>
