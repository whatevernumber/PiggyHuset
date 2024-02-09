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
		border-color: #f6b5d3;
		background-color: #E1EDCE;
		font-family: Jost, Arial, sans-serif;
		font-size: 18px;

		&:focus {
			outline-color: #88aa4d;
		}
	}

	.input_header {
		position: absolute;
		left: -80px;
		top: 10px;
	}

    .input-error {
        border: 2px #D97544 solid;
		border-radius: 5px;
    }

	.input-error + .input-error-label {
		display: block;
		font-size: 12px;
		color: #d97544;
		text-transform: uppercase;
		text-align: center;
	}

	.input-error-label {
		display: none;
	}

    @media (max-width: 1001px) {
		.input_header {
			display: none;
		}
    }
</style>
