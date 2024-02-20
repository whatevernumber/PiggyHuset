<script>

import {page} from "$app/stores";
import Header from "$lib/components/header/Header.svelte";
import Footer from "$lib/components/footer/Footer.svelte";
import ReturnButton from "$lib/components/misc/button/ReturnButton.svelte";

$: url = $page.url.pathname;

const warn = console.warn;
console.warn = (...args) => {
    if (
        args.length === 1 &&
        /was created (with unknown|without expected) prop/.test(args[0])
    ) {
        return;
    }
    warn(...args);
};
</script>

<Header current={url} />
<slot/>
    {#if $page.params.id}
<ReturnButton />
    {/if}
<Footer />
