<script>
	import AddPigForm from '$lib/components/forms/AddPigForm.svelte';
</script>

<svelte:head>
	<title>Добавить новую свинку</title>
</svelte:head>

<section class="container">
	<AddPigForm />
</section>

<style>
    .container {
        min-height: 100%;
        margin:auto;
        background: url("/img/main-bg.png") no-repeat;
        background-size: cover;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>