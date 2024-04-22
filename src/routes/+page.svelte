<script>
	import Banner from "$lib/components/banner/Banner.svelte";
	import About from "$lib/components/about/About.svelte";
	import LookingForHouse from "$lib/components/looking-for-house/LookingForHouse.svelte";
	import Graduated from "$lib/components/graduated/Graduated.svelte";
	import AboutModal from "$lib/components/modal/AboutModal.svelte";
	import Overlay from '$lib/components/misc/overlay/Overlay.svelte';
	import {fly} from "svelte/transition";

	let modal_opened = false; // флаг для оверлея
</script>

<svelte:head>
	<title>Домик для Бездомных Поросят</title>
</svelte:head>

<h1 class="main-header">Домик для бездомных поросят</h1>
<main in:fly={{y: 1000, duration: 500, delay: 0}}>
	<Banner />
	<div class="landing_main_wrapper main_wrapper">
		<About bind:modal_opened={modal_opened} />
		<LookingForHouse />
		<Graduated />
	</div>
</main>

<AboutModal />
{#if modal_opened}
	<Overlay />
{/if}

<style>
	.main-header {
		font-size: 0;
	}

    .landing_main_wrapper {
        max-width: 1280px;
        margin: 0 auto;
        position: relative;

		@media (max-width: 1001px) {
			max-width: 100%;
			margin: auto 5%;
		}

		@media (max-width: 1279px) {
			margin: 0 auto;
		}
	}
</style>