<script>
    import TurnInForm from "$lib/components/forms/TurnInForm.svelte";

    const title = 'Отдать Свинку';
</script>
<svelte:head>
    <title>{title}</title>
</svelte:head>

<TurnInForm {title} />
