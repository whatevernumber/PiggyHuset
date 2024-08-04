<script>
	import Banner from "$lib/components/banner/Banner.svelte";
	import About from "$lib/components/about/About.svelte";
	import LookingForHouse from "$lib/components/looking-for-house/LookingForHouse.svelte";
	import Graduated from "$lib/components/graduated/Graduated.svelte";
	import AboutModal from "$lib/components/modal/AboutModal.svelte";
	import Overlay from '$lib/components/misc/overlay/Overlay.svelte';
	import {fly} from "svelte/transition";
	import VKCommunityMessages from "$lib/components/widgets/VKCommunityMessages.svelte";

	export let data;

	let modal_opened = false; // флаг для оверлея
</script>

<svelte:head>
	<meta name="description" content="У нас вы можете взять морскую свинку бесплатно в добрые руки. Или отдать из-за развившейся аллергии или по иным причинам" />
	<title>ДОМИК для бездомных поросят – проект помощи морским свинкам</title>
</svelte:head>

<main in:fly={{y: 1000, duration: 500, delay: 0}}>
	<Banner />
	<div class="landing_main_wrapper main_wrapper">
		<About bind:modal_opened={modal_opened} />
		<LookingForHouse />
		<Graduated />
	</div>
</main>

<VKCommunityMessages />

<AboutModal cities={data?.cities} />

{#if modal_opened}
	<Overlay />
{/if}

<style>
    .landing_main_wrapper {
        max-width: 1280px;
        margin: 0 auto;
        position: relative;
	}

    @media (max-width: 1001px) {
		.landing_main_wrapper {
            max-width: 100%;
            margin: auto 5%;
        }
    }

    @media (max-width: 1279px) {
		.landing_main_wrapper {
			margin: 0 auto;
		}
    }
</style>