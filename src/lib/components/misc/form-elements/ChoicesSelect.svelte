<script>
	import "/choices.js/public/assets/styles/choices.css";
	import { onMount } from 'svelte';

	export let fieldName = 'select';
	export let options = [
		{id: 0, value: 'Что-то пошло не так'},
	];
	export let multiple = false;
	export let selected;

	onMount(async () => {
		const choicesModule = await import('choices.js');
		const element = document.querySelector('#' + fieldName);
		const choices = new choicesModule.default(element, {
			itemSelectText: '',
			noResultsText: 'Нет результатов',
			noChoicesText: 'Не осталось опций',
		});

		if (selected) {
			if (multiple) {
				for (let option of selected) {
					choices.setChoiceByValue(option)
				}
			} else {
				choices.setChoiceByValue(selected);
			}
		}
	});
</script>

<div class="select_wrapper">
	<select multiple="{multiple}" name="{fieldName + (multiple ? '[]' : '')}" id="{fieldName}">
		{#each options as option}
			<option value="{option.id}">{option.value}</option>
		{/each}
	</select>
</div>

<style>
	.select_wrapper {
		display: flex;
        margin-bottom: 20px;
		align-items: center;
    }

	:global(.choices__inner) {
        width: 438px;
        padding: 10px 10px;
        border: none;
        background-color: rgba(225, 237, 206, 0.5);
        font-family: Jost, Arial, sans-serif;
        font-size: 18px;
	}

	:global(.choices__input) {
        background-color: rgba(225, 237, 206, 0.1);
	}

	:global(.choices__list--multiple .choices__item) {
		border-color: #88aa4d;
		background-color: #d97544;
	}

    :global(.choices__list--multiple .choices__item.is-highlighted) {
        border-color: #88aa4d;
        background-color: #F6B5D3;
    }

	:global(.choices__list--dropdown .choices__item, .choices__list[aria-expanded] .choices__item) {
		background-color: #e1edce;
	}

	@media (max-width: 978px) {
        :global(.choices__inner) {
            width: 200px;
        }
	}
</style>
