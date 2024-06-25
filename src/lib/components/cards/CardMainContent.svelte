<script context="module">
	import { dayjs } from "svelte-time";
	import "dayjs/locale/ru";
	dayjs.locale('ru');
</script>

<script>
	import ArticleHeader from '$lib/components/misc/h-headers/ArticleHeader.svelte';
	import { showModal, closeModal } from "$lib/components/utils/func.js";
	import Time from "svelte-time";
	import { onMount } from 'svelte';

	export let pig;

	export let author;
	export let admin;
	export let is_article = false;
	export let type;
	export let modal_opened;
	export let status_value;
	export let pig_status;
	export let pig_status_id;
	export let action;
	export let header;
	let status_list = [];
	let current_status = pig?.status.text ?? ' ';
	$: pig_header = pig?.name ? pig.name + ' — ' + current_status : null;

	if (pig && pig.sex) {
		switch(pig.sex) {
			case 'F':
				pig.sex = 'Девочка';
				break;
			case 'M':
				pig.sex = 'Мальчик';
				break;
		}
	}

	const click_handler = (evt) => {
		modal_opened = true;
		showModal(evt);
		action = 'change';
		document.removeEventListener('click', closeModal);
		status_value = evt.target.value;
	}

	onMount(async () => {
		if(!is_article) {
			const res = await fetch('/api/pigs/statuses', {
				method: 'GET'
			});

			if (res.ok) {
				status_list = await res.json();
				current_status = status_list.find(i => i.id === pig_status_id).text;
				status_list = status_list.filter(i => i.id !== pig_status_id);
			}
		}
	})

</script>

<div class="profile_description">
	{#key pig_header}
		<ArticleHeader text={pig_header || header} {type} />
	{/key}
	<div class="bio_wrapper">
		{#if (admin && !is_article)}
		<div class='radio_group'>
			{#each status_list as status}
			<label class='graduated_radio'>
				<input type='radio' name='graduated' value={status.id} on:click={click_handler}>
				<span class='radio_value'>
					{status.text}
				</span>
			</label>
			{/each}
		</div>
		{/if}
		<div class='bio'>
			{#if !is_article}
				{#if pig_status_id === 6}
				<p class="quarantine-notice">
					<strong>Внимание!</strong>
					Животное сейчас находится на карантине и будет искать дом немного позже. Следите за обновлением.
				</p>
				{/if}
				{#if pig.graduation_date && pig_status_id !== 1}
				<p class="info pig_graduation"><b>{pig_status}:</b> <Time timestamp={pig.graduation_date} format="DD MMMM YYYY г." /></p>
				{/if}
				{#if pig.sex}
				<p class="info pig_sex"><b>Пол:</b> {pig.sex}</p>
				{/if}
				{#if pig.age}
				<p class="info pig_age"><b>{pig.sex === 'Мальчик' ? 'Поступил' : 'Поступила'} к нам в возрасте:</b> {pig.age}</p>
				{/if}
				{#if pig.city}
				<p class="info pig_city"><b>Город:</b> {pig.city.city_name}</p>
				{/if}
				{#if pig.overseer}
				<p class="info pig_overseer"><b>Куратор:</b> {pig.overseer.overseer_name}</p>
				{/if}
			{/if}
			{#if author}
				<p class="article_author"><b>Автор статьи:</b> <i style="color: forestgreen">{author}</i></p>
			{/if}
		</div>
	</div>
</div>

<style>
    .profile_description {
        display: flex;
        flex-direction: column;
		flex-grow: 1;
        row-gap: 50px;
    }

	.bio_wrapper {
		display: flex;
		flex-direction: column-reverse;
		row-gap: 25px;
		width: 100%;
		margin-bottom: 25px;
	}

	.bio {
		display: flex;
		flex-direction: column;
		row-gap: 10px;
	}

	.pig_graduation:first-letter {
		text-transform: capitalize;
	}

	.radio_group {
		row-gap: 15px;
		width: 100%;
		margin-left: 25px;
		display: grid;
		grid-template-columns: repeat(auto-fill, 12rem);
		column-gap: 15px;
		position: relative;
	}

	.graduated_radio {
		position: relative;
		margin-left: 10px;
		padding-left: 25px;
        cursor: pointer;
	}

	.graduated_radio input[type='radio'] {
        display: none;
	}

    .graduated_radio span::before {
        content: '';
		position: absolute;
        display: inline-block;
        width: 22px;
        height: 22px;
        margin-right: 10px;
		left: -10px;
        border: 1px solid #d97544;
        vertical-align: middle;
		cursor: pointer;
    }

    .graduated_radio:hover span::before {
        border: 2px solid #d97544;
    }

    .graduated_radio:hover span::after {
        content: '';
		position: absolute;
        width: 6px;
        height: 11px;
        border: solid #88aa4d;
        border-width: 0 3px 3px 0;
        transform: rotate(45deg);
        top: 10%;
        left: -2px;
		opacity: 0.5;
    }

    .graduated_radio input[type='radio']:checked + span::after {
        opacity: 1;
    }

	.radio_value {
		color: #EF8653;
		font-size: 18px;
		font-weight: bold;
	}

	.graduated_radio:first-letter {
		text-transform: capitalize;
	}

    @media (max-width: 1000px) {
        .profile_description {
            flex-direction: column;
            padding: 0 20px;
            row-gap: 10px;
        }

		.radio_group {
			grid-template-columns: 50% 50%;
			width: 120%;
			left: -15vw;
		}

		.radio_group > label {
			scale: 0.9;
		}
    }

	.quarantine-notice {
		color: red;
		text-decoration: 1px solid underline;
	}
</style>