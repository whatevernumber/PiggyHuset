<script>
	import ButtonWithIcons from '$lib/components/misc/button/ButtonWithIcons.svelte';

	export let curator = 'Домик Рыси';
	export let success = true;

	let color = "#E1EDCE";

	if (!success) {
		color = "#F6B5D3";
	}
</script>

<div class="modal modal_contact modal_closed modal_wrapper">
	<div class="border_wrapper" style="--border_color: {color}">
		<p class='message_info'>Куратор свинки - {curator}. <br> Пожалуйста, напишите в нашу группу ВК.</p>
		<ButtonWithIcons class_name="close-button" title='Хорошо' icon='success-pig.png' />
	</div>
</div>

<style>
	.modal {
		position: absolute;
		bottom: 45%;
		padding: 25px;
		left: 50%;
        display: flex;
        max-width: 597px;
        background-color: #F0F8FF;
		transform: translateX(-50%);
    }

    .border_wrapper {
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
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 140%;
        text-transform: uppercase;
		color: #333333;
    }
</style>