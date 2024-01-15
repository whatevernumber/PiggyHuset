<script>
	import AddPigForm from '$lib/components/forms/AddPigForm.svelte';
</script>

<svelte:head>
	<title>Добавить новую свинку</title>
</svelte:head>

<section class="container">
	<AddPigForm redirect_location="/looking-for-home" />
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