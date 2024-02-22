<script>
	import ButtonWithIcons from '$lib/components/misc/button/ButtonWithIcons.svelte';
	import SmolButton from '$lib/components/misc/button/SmolButton.svelte';
	import { closeModal } from '$lib/components/utils/func.js';

	export let desc = '';
	export let success;
	export let action;
	export let action_handler;
	export let redirect;
	export let sent_handle;
	export let modal_opened;
	export let handle_cancel = (evt) => {
		closeModal(evt);
	};

	let color = '#E1EDCE';

	if (!success) {
		color = "#F6B5D3";
	}
	const reload = (evt) => {
		modal_opened = false;
		closeModal(evt);
		action = 'delete';
	}

	const close = (evt) => {
		modal_opened = false;
		closeModal(evt);
	}

</script>

<div class="modal modal_wrapper">
	<div class="border_wrapper" style='--border_color: {color}'>
		<p class='message'>{desc}</p>
		{#if action === 'delete'}
			<div class='buttons'>
				<SmolButton class_name="smol-red" title='Удалить' click_handler={action_handler} />
				<SmolButton class_name="close-button" title='Не удалять' click_handler={handle_cancel} />
			</div>
		{:else if action === 'complete' }
			<ButtonWithIcons class_name="close-button modal_button" title='Хорошо' icon='success-pig.png' onclick={close} />
		{:else if action === 'card_delete' }
			<ButtonWithIcons class_name="close-button modal_button" title='Хорошо' icon='success-pig.png' onclick={redirect} />
		{:else if action === 'fail' }
			<ButtonWithIcons class_name="close-button modal_button" title='Понятно' onclick={reload} />
		{:else if action === 'sent'}
			<ButtonWithIcons class_name="modal_button" title='Отлично' onclick={sent_handle} />
		{/if}
	</div>
</div>

<style>

	.modal_wrapper {
		bottom: 40%;
        position: fixed;
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
		margin-bottom: 15px;
		font-size: 14px;
		font-style: normal;
		font-weight: 400;
		line-height: 140%;
		text-transform: uppercase;
	}

	.buttons {
		display: flex;
		min-width: 300px;
		justify-content: space-around;
	}

    @media (max-width: 1001px) {
        .modal_wrapper {
            min-width: 100%;
			padding: 0;
            max-width: 250px;
            min-height: 0;
        }

		.border_wrapper {
			border: none;
		}
    }
</style>