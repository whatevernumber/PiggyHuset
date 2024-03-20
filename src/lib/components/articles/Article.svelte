<script context="module">
	import { dayjs } from "svelte-time";
	import "dayjs/locale/ru";
	dayjs.locale('ru');
	import {fly, blur} from "svelte/transition";
</script>

<script>
	import Time from "svelte-time";
	import {browser} from "$app/environment";
	import ArticleText from "$lib/components/articles/ArticleText.svelte";
	import PhotoList from "$lib/components/photo-list/PhotoList.svelte";
	import PigNotification from "$lib/components/articles/PigNotification.svelte";
	export let date;
	export let class_name = '';
	export let type = 'article';
	export let text;
	export let pig_name;
	export let pig_status = null;
	export let photos;

	let date_prefix;

	switch (type) {
		case 'pig':
		case 'graduate':
			date_prefix = 'Дата поступления';
			break;
		default:
			date_prefix = 'Опубликовано';
	}

	let transition = browser && innerWidth > 1000 ? fly : blur;
</script>

<div class="article_wrapper">
	<article class="article {class_name}" in:transition={{x: '200vw', y: 0, duration: 400, delay: 0, amount: 3}}>
		<slot />
		<ArticleText {text} />
	{#if pig_name && (pig_status && pig_status === 'в поисках дома')}
		<PigNotification {pig_name} />
	{/if}
	{#if photos && photos.length > 1}
		<PhotoList photos={photos} />
	{/if}
		<div class="date">
			<p class="date-description">
				{date_prefix}: <Time timestamp={date} format="DD MMMM YYYY г." />
			</p>
		</div>
	</article>
</div>

<style global>
	.date {
		margin-top: 10px;
		padding-right: 10px;
		align-self: flex-end;
		font-style: italic;
		color: #adadad;
	}

    .article {
        min-height: fit-content;
        min-height: -moz-fit-content;
        min-width: 500px;
        padding: 19px 40px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        row-gap: 30px;
        background-color: #FFFFFF;
    }

    .article_wrapper {
        max-width: 40vw;
        margin: 54px auto;
        position: relative;
    }

    .article_news {
        max-width: 600px;
    }

    .article_post {
        justify-content: normal;
    }

    .article_request {
        width: 400px;
        justify-content: normal;
    }

    .article_author {
        margin-left: 225px;
    }

	@media (max-width: 1001px) {
		.article {
			min-height: auto;
			min-width: auto;
			max-width: 90%;
			margin: 0 auto;
			padding: 0 10%;
			row-gap: normal;
			justify-content: center;
			background-color: #FFFFFF;
		}

		.article_wrapper {
			max-width: 100%;
			margin: 0;
		}

		.article_author {
			margin-left: auto;
			width: 50%;
			display: flex;
			flex-direction: column;
		}

		.date {
			margin-top: 50px;
			margin-bottom: 20px;
		}

        /*.article_news {*/
        /*    height: calc(100vh / 1.2);*/
        /*}*/
	}
</style>