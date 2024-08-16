<script>
	import Button from '$lib/components/misc/button/Button.svelte';
	import BigHeader from '$lib/components/misc/h-headers/BigHeader.svelte';
	import '@splidejs/svelte-splide/css/splide.min.css';
	import {onMount} from "svelte";
	import Loader from '$lib/components/misc/loading/Loader.svelte';
	import SmallPreviewCard from '$lib/components/cards/SmallPreviewCard.svelte';

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
				console.log(articles);
			}).catch((any) => {});
	});

</script>

<section class="landing_article_wrapper">
	<BigHeader text_content={type_id === 2 ? 'Последние новости' : 'Статьи'} />

	{#await request}
		<Loader />
	{:then _}
		<div class="article_section">
			{#each articles as article}
			<SmallPreviewCard {article} {type_id}/>
			{/each}
		</div>
	{/await}
	<Button href={type_id === 1 ? '/articles' : 'news'} title="Посмотреть" background_color="#D97544" text_color="#FFFFFF" />
</section>

<style>
	.landing_article_wrapper {
        margin-bottom: 40px;
        padding: 0 80px;
	}

    .article_section {
        display: flex;
        justify-content: space-between;
        margin-bottom: 40px;
    }

    @media (max-width: 1001px) {

        .landing_article_wrapper {
            max-width: 400px;
            padding: 0;
            margin-left: auto;
            margin-right: auto;
        }

        .article_section {
            flex-wrap: wrap;
            justify-content: center;
        }
    }
</style>