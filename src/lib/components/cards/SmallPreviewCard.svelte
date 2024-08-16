<script context="module">
	import { dayjs } from "svelte-time";
	import "dayjs/locale/ru";
	dayjs.locale('ru');
</script>

<script>
	import {_REMOTE_SERVER} from "$env/static/public";
	import {randomize} from "$lib/components/utils/func.js";
	import LinkWithReferrer from "$lib/components/misc/links/LinkWithReferrer.svelte";
	import Time from 'svelte-time';

	export let article;
	export let type_id;

	let type = type_id === 2 ? 'news' : 'article';
	export let placeholder_picture = `${type}-${randomize(1, 3)}`;
	let src = article.main_photo ? `${_REMOTE_SERVER}/img/${article.main_photo}` :
	`/img/placeholder/${placeholder_picture}.png`;
</script>


<div class="article_card">
	<LinkWithReferrer href="{'/' + type === 'news' ? type : 'articles' + '/' + article.id}">
		<img {src} width="248" height="261" alt="Обложка статьи">
	</LinkWithReferrer>
	<a href="{'/' + type + '/' + article.id}">
		<h3 class="title">{article.title}</h3>
	</a>
	<p class="date">
		<Time timestamp={article.datetime} format="DD MMMM YYYY г." />
	</p>
</div>


<style>
    .article_card {
        min-height: 290px;
        width: 254px;
        padding: 20px;
        border: 1px solid rgba(0, 0, 0, 0.10);
        display: flex;
        flex-direction: column;
        row-gap: 10px;
    }

	.date {
		margin-top: auto;
		font-style: italic;
	}
</style>