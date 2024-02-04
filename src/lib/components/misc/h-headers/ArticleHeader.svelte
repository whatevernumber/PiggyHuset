<script>
	export let text = 'Заголовок';
	export let size = '24px';
	export let type;
</script>

<h1 class="article_header" class:type_article={type === 1} style='--font-size: {size}'>
	{text}
</h1>

<style>
	.article_header {
		margin: 0;
		padding: 0;
		font-size: var(--font-size);
	  	font-style: normal;
	  	font-weight: 700;
	  	line-height: 130%;
		text-align: center;
		text-transform: uppercase;

		&.type_article {
			 margin-left: 225px;
	    }
	}
</style>