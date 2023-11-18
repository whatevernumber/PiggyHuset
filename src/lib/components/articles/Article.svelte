<script>
	export let class_name = "";
</script>

<article class="article {class_name}">
	<slot />
</article>

<style>

	.article {
			width: 1000px;
			min-height: 604px;
			padding: 19px 70px 40px 19px;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			row-gap: 20px;
			background-color: #FFFFFF;
	}

	.article_news {
      width: 600px;
	}

</style>