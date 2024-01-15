<script>
    import TurnInForm from "$lib/components/forms/TurnInForm.svelte";

    const title = 'Отдать Свинку';
</script>
<svelte:head>
    <title>{title}</title>
</svelte:head>

<section class="container">
    <TurnInForm {title} />
</section>

<style>
    .container {
        min-height: 100%;
        margin: auto;
        background: url("/img/main-bg.png") no-repeat;
        background-size: cover;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>