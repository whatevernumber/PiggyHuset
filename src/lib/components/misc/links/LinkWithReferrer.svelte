<script>
    import {page} from "$app/stores";

    export let href = '#';
    export let css_class = '';
</script>

<a {href} class="{css_class}" on:click={() => sessionStorage.setItem('referrer', $page.url.href)}>
    <slot />
</a>

<style>
    a.card-container     {
        display: flex;
        place-content: center;
        flex-direction: column;
        height: min-content;
    }
</style>