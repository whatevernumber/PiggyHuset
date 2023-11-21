<script>
	import Banner from "$lib/components/banner/Banner.svelte";
	import About from "$lib/components/about/About.svelte";
	import LookingForHouse from "$lib/components/looking-for-house/LookingForHouse.svelte";
	import Graduated from "$lib/components/graduated/Graduated.svelte";
	import AboutModal from "$lib/components/modal/AboutModal.svelte";
</script>

<svelte:head>
	<title>Домик для Морских Поросят</title>
</svelte:head>

<Banner />
<div class="landing_main_wrapper">
	<About />
	<LookingForHouse />
	<Graduated />
</div>

<AboutModal />

<style>

    .landing_main_wrapper {
        max-width: 1280px;
        margin: 0 auto;
        position: relative;
    }
</style>