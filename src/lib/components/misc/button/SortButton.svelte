<script>
    import SmolButton from "$lib/components/misc/button/SmolButton.svelte";

    export let class_name = '';
    export let click_handler = null;
    export let title;
</script>

<SmolButton class_name="sort-button {class_name}" {click_handler} {title} />