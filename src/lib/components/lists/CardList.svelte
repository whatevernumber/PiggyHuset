<script>

</script>

<ul class="list">
    <slot />
</ul>

<style>
    ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .list {
        display: flex;
        flex-direction: column;
        row-gap: 25px;
    }

</style>