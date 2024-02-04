<script>

import {page} from "$app/stores";
import Header from "$lib/components/header/Header.svelte";
import Footer from "$lib/components/footer/Footer.svelte";
import ReturnButton from "$lib/components/misc/button/ReturnButton.svelte";

$: url = $page.url.pathname
</script>

<Header current={url} />
<slot/>
    {#if $page.params.id}
<ReturnButton />
    {/if}
<Footer />
