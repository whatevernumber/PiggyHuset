<script context="module">
	import { dayjs } from "svelte-time"
	import "dayjs/locale/ru";
	dayjs.locale('ru')
	import {fly} from "svelte/transition";
</script>

<script>
	import Time from "svelte-time";
	export let date;
	export let class_name = '';
	export let date_description = 'Опубликовано';
</script>

<div class="article_wrapper">
	<article class="article {class_name}" in:fly={{x: 400, duration: 600, delay: 0}}>
		<slot />
		<div class="date">
			<p class="date-description">
				{date_description}: <Time timestamp={date} format="DD MMMM YYYY г." />
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
        min-height: 604px;
        min-width: 500px;
        padding: 19px 40px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        row-gap: 50px;
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
			padding: 0;
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

        .article_news {
            min-width: 100%;
        }
	}
</style>