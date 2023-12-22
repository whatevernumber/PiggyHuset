<script>
	export let text = 'Заголовок';
	export let size = '24px';
</script>

<h1 class="article_header" style='--font-size: {size}'>
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
	}
</style>