<script>
	import {onMount} from "svelte";

	export let name = "photo";
	export let multiple = false
	export let onchange = null;
	export let class_name = '';

	onMount(
		() => {
			if (onchange) {
				document.querySelector('input[type="file"]')
						.addEventListener('change', onchange);
			}
		}
	)

</script>

<label class="input-file">
	<input class="{class_name}" type="file" {name} accept="image/jpeg" {multiple}>
	<span class="input-file-prompt">Выберите фото</span>
	<span class="input-error-label"></span>
</label>

<style>
    @media (min-width: 1001px) {
		.input-file {
			display: grid;
			grid-auto-flow: column;
			align-items: center;
			column-gap: 5%;
			width: 150%;
		}
	}

	@media (max-width: 1000px) {
		.input-file {
			display: flex;
			flex-direction: column;
			row-gap: 20px;
		}
	}

    .input-file .input-file-prompt {
        width: 100px;
		min-height: 26px;
        display: inline-block;
        cursor: pointer;
        font-size: 12px;
        vertical-align: middle;
        color: #FFFFFF;
        text-align: center;
        background-color: #D97544;
        line-height: 26px;
        padding: 5px 10px;
		text-transform: uppercase;
    }

    .input-file input[type=file] {
        position: absolute;
        z-index: -1;
        opacity: 0;
        display: block;
        width: 0;
        height: 0;
    }

	.input-error-label {
		display: none;
	}

	.input-error ~ .input-error-label {
		display: block;
		color: #D97544;
	}
</style>