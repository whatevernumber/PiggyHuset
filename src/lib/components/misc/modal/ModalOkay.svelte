<script>
	import ButtonWithIcons from '$lib/components/misc/button/ButtonWithIcons.svelte';

	export let desc = 'Пост успешно создан! Произошла ошибка, попробуйте ещё раз позднее';
	export let success = true;

	let color = '#E1EDCE';

	if (!success) {
		color = "#F6B5D3";
	}
</script>

<div class="modal_wrapper">
	<div class="border_wrapper" style='--border_color: {color}'>
		<p class='message'>{desc}</p>
		<ButtonWithIcons title='Хорошо' icon='success-pig.png' />
	</div>
</div>

<style>
	.modal_wrapper {
		position: absolute;
		bottom: 10%;
		display: flex;
		padding: 20px 20px;
		min-width: 517px;
		max-width: 557px;
		min-height: 218px;
		background-color: #FFFFFF;
	}

	.border_wrapper {
		padding: 10px 10px;
		margin: auto;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		row-gap: 20px;
		width: 500px;
		min-height: 205px;
		border: 5px solid;
		border-color: var(--border_color);
		text-align: center;
	}

	.message {
		font-size: 14px;
		font-style: normal;
		font-weight: 400;
		line-height: 140%;
		text-transform: uppercase;
	}
</style>