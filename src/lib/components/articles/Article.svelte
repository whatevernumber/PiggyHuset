<script context="module">
	import { dayjs } from "svelte-time"
	import "dayjs/locale/ru";
	dayjs.locale('ru')
</script>

<script>
	import Time from "svelte-time";
	export let date;
	export let class_name = '';
	export let date_description = 'Опубликовано';
</script>

<div class="article_wrapper">
	<article class="article {class_name}">
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

	@media (min-width: 1001px) {
		.article_wrapper {
			max-width: 50vw;
			margin: 54px auto;
			position: relative;
		}

		.article {
			min-height: 604px;
			padding: 19px 40px;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			row-gap: 50px;
			background-color: #FFFFFF;
		}

        .article_news {
			min-width: 500px;
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
    }

	@media (max-width: 1001px) {
		.article {
			display: flex;
			flex-direction: column;
			justify-content: center;
			background-color: #FFFFFF;
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