<script>
	import ArticleHeader from '$lib/components/misc/h-headers/ArticleHeader.svelte';
	import ArticleText from '$lib/components/articles/ArticleText.svelte';
	import {showModal, redirect, include_auth} from "$lib/components/utils/func.js";
	import { _REMOTE_SERVER, _REST_STORAGE_KEY } from '$env/static/public';

	export let header;
	export let text;
	export let graduated;
	export let age;
	export let author;
	export let admin;
	export let id;
	export let is_article;
	export let type;

	const click_handler = (evt) => {
		showModal(evt);
		evt.target.removeEventListener('click', click_handler);
	}

	async function graduatePig () {
		const res = await fetch(_REMOTE_SERVER + '/pigs/graduate/' + id, {
			method: 'PATCH',
			headers: {
				'Authorization': include_auth(_REST_STORAGE_KEY)
			}
		});

		if (res.ok) {
			let result = await res.json();

			if (result) {
				redirect(`/graduates/${id}`, 100)
			}
		}
	}

</script>

<div class="profile_description">
	<ArticleHeader text={header} {type} />
	{#if graduated}
	<div class='graduated_image'>
		<img class="graduated-icon" src="/img/found-home.png" width="50px" height="50px" alt="Морская свинка в домике">
	</div>
	{:else if (admin && !is_article)}
	<div class='checkbox'>
		<label class='graduated_checkbox'>
			<input type='checkbox' name='graduated' on:click={graduatePig}>
			<span class='checkbox_message'>Дом найден?</span>
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

	.volunteer {
		font-size: 14px;
		font-style: italic;
		align-self: flex-end;
	}

	.graduated_checkbox {
		position: relative;
		margin-left: 10px;
		padding-left: 25px;
        cursor: pointer;
	}

	.graduated_checkbox input[type='checkbox'] {
        display: none;
	}

    .graduated_checkbox span::before {
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

    .graduated_checkbox:hover span::before {
        border: 2px solid #d97544;
    }

    .graduated_checkbox span::after {
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

    .graduated_checkbox input[type='checkbox']:checked + span::after {
        display: block;
    }

	.checkbox_message {
		color: #EF8653;
		font-size: 18px;
		font-weight: bold;
	}

    @media (max-width: 1000px) {
        .profile_description {
            flex-direction: column;
            padding: 0 20px;
            row-gap: 10px;
        }
    }
</style>