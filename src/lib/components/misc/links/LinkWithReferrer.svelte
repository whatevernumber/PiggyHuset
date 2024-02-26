<script>
    import {page} from "$app/stores";

    export let href = '#';
</script>

<a {href} on:click={() => sessionStorage.setItem('referrer', $page.url.href)}>
    <slot />
</a>