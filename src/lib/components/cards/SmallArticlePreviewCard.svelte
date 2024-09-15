<script context="module">
	import { dayjs } from "svelte-time";
	import "dayjs/locale/ru";
	dayjs.locale('ru');
</script>

<script>
	import { _CLOUD_SERVER } from '$env/static/public';
	import {randomize} from "$lib/components/utils/func.js";
	import LinkWithReferrer from "$lib/components/misc/links/LinkWithReferrer.svelte";
	import Time from 'svelte-time';
	import { onMount } from 'svelte';
	import { addParallaxEffect } from '$lib/parallax.js';

	export let article;
	export let type_id;

	let type = type_id === 1 ? 'article' : 'news';
	export let placeholder_picture = `${type}-${randomize(1, 3)}`;
	let src = article.main_photo ? `${_CLOUD_SERVER}/${article.main_photo}` :
		`/img/placeholder/${placeholder_picture}.png`;

	let link = '/' + (type === 'news' ? type : 'articles') + '/' + article.id;

	//

	onMount(() => {
		addParallaxEffect('.article_card');
	});
</script>


<div class="article_card">
	<LinkWithReferrer href={link}>
		<img class="preview_image" {src} width="248" height="261" alt="Обложка статьи">
	</LinkWithReferrer>
	<a class="link_header" href={link}>
		<h3 class="title">{article.title}</h3>
	</a>
	<p class="article_date">
		<Time timestamp={article.datetime} format="DD MMMM YYYY г." />
	</p>
</div>


<style>
    .article_card {
        min-height: 405px;
        width: 254px;
        padding: 20px;
        display: flex;
        flex-direction: column;
        row-gap: 10px;
        order: 0;
        align-self: flex-start;
		box-shadow: 1px 1px 10px 2px lightblue;
        transform-style: preserve-3d;
    }

	.article_date {
		opacity: 0.7;
		font-size: 14px;
		font-style: italic;
        color: #adadad;
	}

	.preview_image {
		object-fit: cover;
	}

	.link_header {
        order: 2;
	}
</style>