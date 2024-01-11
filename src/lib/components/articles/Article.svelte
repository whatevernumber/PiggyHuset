<script context="module">
	import { dayjs } from "svelte-time"
	import "dayjs/locale/ru";
	dayjs.locale('ru')
</script>

<script>
	import Time from "svelte-time";
	export let date;
	export let class_name;
	export let date_description = 'Опубликовано';
</script>

<div class="article_wrapper">
	<article class="article {class_name}">
		<slot />
		<div class="date">
			<Time timestamp={date} />
		</div>
	</article>
</div>

<style>
	.article_wrapper {
		max-width: 1089px;
		margin: 54px auto;
		position: relative;
	}

	.article {
		width: 1000px;
		min-height: 604px;
		padding: 19px 40px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		row-gap: 50px;
		background-color: #FFFFFF;
	}

	.article_news {
      	width: 600px;
	}

	.article_post {
		justify-content: normal;
	}

	.article_request {
		width: 400px;
      	justify-content: normal;
	}

	.date {
		align-self: flex-end;
		font-style: italic;
		color: #adadad;
	}

</style>