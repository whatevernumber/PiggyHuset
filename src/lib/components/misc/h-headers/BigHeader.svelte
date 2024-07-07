<script>
    export let text_content = 'Заголовок';
    export let class_name;
    export let position = 'center';
</script>

<h2 class="{class_name}" style="--position: {position}">
    {text_content}
</h2>

<style>
    h2 {
        margin-bottom: 40px;
        text-align: var(--position);
        text-transform: uppercase;
        font-size: 36px;
        font-weight: 700;
    }

    h2.smaller-margin {
       margin-bottom: 20px;
    }
</style>