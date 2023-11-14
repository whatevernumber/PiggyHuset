
<script>

import {page} from "$app/stores";
import Header from "../lib/components/header/Header.svelte";
import Footer from "../lib/components/footer/Footer.svelte";
$: url = $page.url.pathname
</script>

<Header current = {url} />

<slot/>

<Footer />


