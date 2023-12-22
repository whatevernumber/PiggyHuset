<script>
	import Article from '$lib/components/articles/Article.svelte';
	import SmolButton from '$lib/components/misc/button/SmolButton.svelte';
	import ArticleHeader from '$lib/components/misc/h-headers/ArticleHeader.svelte';
	import PigCard from '$lib/components/cards/pig-card/PigCard.svelte';
</script>

<div class="article_wrapper">
	<Article class_name="article_post">
		<header class="admin_header">
			<SmolButton title="Добавить Свинку" />
			<SmolButton title="Добавить новость" />
			<SmolButton title="Добавить статью" />
			<div class="archive">
				<SmolButton className="smol-grey" title="Архив запросов" />
			</div>
		</header>
		<div class="main_wrapper">
			<div class="pigs_list_wrapper">
				<ArticleHeader text="Ищут Дом"/>
				<ul class="list looking_for_home_list">
					<PigCard />
					<PigCard />
					<PigCard />
					<PigCard />
					<PigCard />
 				</ul>
			</div>
			{#if true}
			<div>
				<ArticleHeader text="Запросы на передачу" />
				<ul class="list new_requests_list">

				</ul>
			</div>
			{/if}
		</div>
	</Article>
</div>

<style>
    .article_wrapper {
        max-width: 1089px;
        margin: 54px auto;
        position: relative;
    }

	.admin_header {
		display: flex;
		column-gap: 15px;
		width: 800px;
		min-height: 30px;
		padding: 5px 10px;
		margin: 0 auto;
		border: 5px solid #F6B5D3;
	}

	.archive {
		margin-left: auto;
		align-self: center;
	}

	.main_wrapper {
		display: flex;
		justify-content: space-around;
		column-gap: 30px;
	}

	.pigs_list_wrapper {
		width: 80%;
	}

	.list {
		min-height: 200px;
		min-width: 100px;
		margin: 15px 0 0;
		padding: 20px;
		list-style: none;
		display: flex;
		flex-direction: column;
		row-gap: 15px;
		flex-wrap: wrap;
	}

	.looking_for_home_list {
		background-color: #E1EDCE;
	}

    .new_requests_list {
        background-color: rgba(166, 109, 135, 0.2);
    }
</style>