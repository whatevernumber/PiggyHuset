<script>
	import Button from '$lib/components/misc/button/Button.svelte';
	import BigHeader from '$lib/components/misc/h-headers/BigHeader.svelte';
	import '@splidejs/svelte-splide/css/splide.min.css';
	import {onMount} from "svelte";
	import Loader from '$lib/components/misc/loading/Loader.svelte';
	import SmallArticlePreviewCard from '$lib/components/cards/SmallArticlePreviewCard.svelte';

	export let type_id;
	let articles = [];
	let request;

	onMount(async () => {
		request = fetch('/api/articles/random?type=' + type_id)
			.then((response) => {
				if (response.ok) {
					return response.json();
				}
			}).then((json) => {
				articles = json.payload;
			}).catch((any) => {});
	});

</script>

<section class="landing_article_wrapper">
	<BigHeader text_content={type_id === 1 ? 'Статьи' : 'Последние новости'} />

	{#await request}
		<div class="loader_wrapper">
			<Loader />
		</div>
	{:then _}
		<div class="article_section">
			{#each articles as article}
			<SmallArticlePreviewCard {article} {type_id}/>
			{/each}
		</div>
	{/await}
	<Button href={type_id === 1 ? '/articles' : '/news'} title="Посмотреть" background_color="#D97544" text_color="#FFFFFF" />
</section>

<style>
	.landing_article_wrapper {
        margin-bottom: 2%;
        padding: 0 80px;
	}

    .article_section {
        display: flex;
        justify-content: space-between;
        margin-bottom: 40px;
    }

	.loader_wrapper {
		width: 40px;
		margin: auto;
	}

    @media (max-width: 1001px) {
        .landing_article_wrapper {
            max-width: 400px;
            padding: 0;
            margin-left: auto;
            margin-right: auto;
			margin-bottom: 40px;
        }

        .article_section {
            flex-wrap: wrap;
            justify-content: center;
            row-gap: 15px;
        }
    }
</style>