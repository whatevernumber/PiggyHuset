<script>
    export let textContent = 'Заголовок';
    export let class_name;
    export let position = 'center';
</script>

<h2 class="{class_name}" style="--position: {position}">
    {textContent}
</h2>

<style>
    h2 {
        margin-bottom: 40px;
        text-align: var(--position);
        text-transform: uppercase;
        font-size: 36px;
        font-weight: 700;
    }
</style>