<script>
	import ArticleHeader from '$lib/components/misc/h-headers/ArticleHeader.svelte';
	import ArticleText from '$lib/components/articles/ArticleText.svelte';
	import { showModal, closeModal } from "$lib/components/utils/func.js";

	export let header;
	export let text;
	export let graduated;
	export let age;
	export let author;
	export let admin;
	export let id;
	export let is_article;
	export let type;
	export let modal_opened;
	export let status_value;
	export let city;
	export let overseer;

	const click_handler = (evt) => {
		modal_opened = true;
		showModal(evt);
		document.querySelector('.message').innerHTML = `Вы собираетесь изменить статус свинки. Это действие <b>необратимо</b>`;
		document.removeEventListener('click', closeModal);
		status_value = evt.target.value;
	}
</script>

<div class="profile_description">
	<ArticleHeader text={header} {type} />
	{#if (admin && !is_article && graduated === 1)}
	<div class='radio_group'>
		<label class='graduated_radio'>
			<input type='radio' name='graduated' value='graduated' on:click={click_handler}>
			<span class='radio_value'>Дом найден?</span>
		</label>
		<label class='graduated_radio'>
			<input type='radio' name='graduated' value='rainbow' on:click={click_handler}>
			<span class='radio_value'>На радуге</span>
		</label>
		<label class='graduated_radio'>
			<input type='radio' name='graduated' value='taken' on:click={click_handler}>
			<span class='radio_value'>Зажаблено</span>
		</label>
	</div>
	{/if}
	<div class='bio'>
		{#if age}
			<p class="info pig_age"><b>Возраст:</b> {age}</p>
		{/if}
		{#if city}
			<p class="info pig_city"><b>Город:</b> {city}</p>
		{/if}
		{#if overseer}
			<p class="info pig_overseer"><b>Куратор:</b> {overseer}</p>
		{/if}
		{#if author}
			<p class="article_author"><b>Автор статьи:</b> <i style="color: forestgreen">{author}</i></p>
		{/if}
	</div>
	<ArticleText text={text} />
</div>

<style>
    .profile_description {
        display: flex;
        flex-direction: column;
		flex-grow: 1;
        row-gap: 50px;
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

	.radio_group {
		display: flex;
		flex-direction: column;
		row-gap: 15px;
	}

	.bio {
		display: flex;
		flex-direction: column;
		row-gap: 10px;
	}

    @media (max-width: 1000px) {
        .profile_description {
            flex-direction: column;
            padding: 0 20px;
            row-gap: 10px;
        }
    }
</style>