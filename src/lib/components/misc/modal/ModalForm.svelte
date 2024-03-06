<script>
	import AddPigForm from '$lib/components/forms/AddPigForm.svelte';
	import NewArticleForm from '$lib/components/forms/NewArticleForm.svelte';
	import TurnInForm from '$lib/components/forms/TurnInForm.svelte';

	export let type;
	export let modal;
</script>

<section class="container">
	{#if type === 'pig'}
		<AddPigForm redirect_location="/looking-for-home" {modal} />
	{:else if type === 'article'}
		<NewArticleForm />
	{:else if type === 'turnin'}
		<TurnInForm />
	{/if}
</section>

<style>
    .container {
        min-height: 100%;
        margin:auto;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>