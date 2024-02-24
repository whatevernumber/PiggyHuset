<script>
	import ArticleHeader from '$lib/components/misc/h-headers/ArticleHeader.svelte';
	import ArticleText from '$lib/components/articles/ArticleText.svelte';
	import {showModal} from "$lib/components/utils/func.js";
	import { closeModal } from '../utils/func.js';

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
	{#if graduated === 2}
	<div class='graduated_image'>
		<img class="graduated-icon" src="/img/found-home.png" width="50px" height="50px" alt="Морская свинка в домике">
	</div>
	{:else if (admin && !is_article && graduated === 1)}
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
	{#if age}
		<p class="pig_age"><b>Возраст:</b> {age}</p>
	{/if}
	{#if author}
		<p class="article_author"><b>Автор статьи:</b> <i style="color: forestgreen">{author}</i></p>
	{/if}
	<ArticleText text={text} />
</div>

<style>
    .profile_description {
        display: flex;
        flex-direction: column;
		flex-grow: 1;
        row-gap: 50px;
    }

	.graduated_image {
		justify-self: flex-start;
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

    .graduated_radio span::after {
        content: '';
		position: absolute;
        display: none;
        width: 6px;
        height: 11px;
        border: solid #000;
        border-width: 0 3px 3px 0;
        transform: rotate(45deg);
        top: 1px;
        left: -2px;
    }

    .graduated_radio input[type='radio']:checked + span::after {
        display: block;
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

    @media (max-width: 1000px) {
        .profile_description {
            flex-direction: column;
            padding: 0 20px;
            row-gap: 10px;
        }
    }
</style>