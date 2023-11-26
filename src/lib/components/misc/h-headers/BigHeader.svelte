<script>
    export let textContent = '';
    export let className = '';
    export let position = 'center';
</script>

<h2 class="{className}" style="--position: {position}">
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