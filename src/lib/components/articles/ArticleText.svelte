<script>
	export let text;
</script>
<p class="article_text">
	{text}
</p>

<style>
	.article_text {
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 150%;
	}

	@media (max-width: 1000px) {
		.article_text {
            text-align: justify;
		}
	}
</style>