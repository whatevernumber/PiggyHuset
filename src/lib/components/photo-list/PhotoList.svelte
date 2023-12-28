<script>
	import PhotoCard from "$lib/components/photo-card/PhotoCard.svelte";
	import PhotoView from "$lib/components/misc/modal/PhotoView.svelte";
	import {onMount} from "svelte";
	import {Splide, SplideSlide} from "@splidejs/svelte-splide";
	import '@splidejs/svelte-splide/css/splide.min.css';

	export let quantity = 10;
	export let autoplay = false;
	export let first_slide = '';

	export let no_border = false;

	let splide = Splide;
	let slider = SplideSlide;
	let src = '/src/lib/img/pig-in-a-hat.jpeg';

	const main_options = {
		type: 'loop',
		perPage: 1,
		perMove: 1,
		pagination: false,
		height: 520,
	};

	const thumb_options = {
		rewind: true,
		fixedWidth: 250,
		focus: 'center',
		isNavigation: true,
		autoplay: {autoplay}
	};

	onMount( () => {
		if (slider && splide) {
			splide.sync(slider.splide);
		}
	});
</script>

<div class="splide-wrapper">
	<Splide id="main-carousel" options="{main_options}" bind:this={splide}>
		{#if (first_slide)}
			<SplideSlide>
				<PhotoView src="/src/lib/img/{first_slide}" no_border />
			</SplideSlide>
		{/if}
		{#each {length: quantity} as item}
			<SplideSlide>
				<PhotoView {src} {no_border} />
			</SplideSlide>
		{/each}
	</Splide>

	<Splide id="thumb-splide" options="{thumb_options}" bind:this={slider}>
		<SplideSlide>
			{#if (first_slide)}
				<img src="/src/lib/img/{first_slide}" width="200" height="200">
			{/if}
		</SplideSlide>
		{#each {length: quantity} as item}
			<SplideSlide>
				<PhotoCard {src} />
			</SplideSlide>
		{/each}
	</Splide>
</div>