<script>
	import PhotoCard from "$lib/components/photo-card/PhotoCard.svelte";
	import PhotoView from "$lib/components/misc/modal/PhotoView.svelte";
	import {onMount} from "svelte";
	import {Splide, SplideSlide} from "@splidejs/svelte-splide";
	import '@splidejs/svelte-splide/css/splide.min.css';

	export let autoplay = false;
	export let first_slide;
	export let photos;

	let temp_address = 'https://8393e96b-2841-4ffe-93df-baf53fa0b998-00-2174wtn3teowp.riker.replit.dev/web/img/'

	export let no_border = false;

	let splide = Splide;
	let slider = SplideSlide;

	if (!photos) {
		photos = [{ image: '/src/lib/img/pig-in-a-hat.jpeg'} ];
	}

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
				<PhotoView src="{temp_address + first_slide + '.jpg'}" no_border />
			</SplideSlide>
		{/if}
		{#each photos as item}
			<SplideSlide>
				<PhotoView src={temp_address + item.image + '.jpg'} {no_border} />
			</SplideSlide>
		{/each}
	</Splide>

	<Splide id="thumb-splide" options="{thumb_options}" bind:this={slider}>
			{#if (first_slide)}
				<SplideSlide>
					<img src="{temp_address + first_slide + '.jpg'}" width="200" height="200">
				</SplideSlide>
			{/if}
		{#each photos as item}
			<SplideSlide>
				<PhotoCard pic={item.image} />
			</SplideSlide>
		{/each}
	</Splide>
</div>