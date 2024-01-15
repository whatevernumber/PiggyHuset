<script>
	import PhotoCard from "$lib/components/photo-card/PhotoCard.svelte";
	import PhotoView from "$lib/components/misc/modal/PhotoView.svelte";
	import {onMount} from "svelte";
	import {Splide, SplideSlide} from "@splidejs/svelte-splide";
	import '@splidejs/svelte-splide/css/splide.min.css';
	import {fade} from "svelte/transition";
	import {_REMOTE_SERVER} from "$env/static/public";

	export let autoplay = false;
	export let first_slide = false;
	export let linked = false;
	export let photos;

	let temp_address = _REMOTE_SERVER + '/img/';

	export let no_border = false;

	let splide = Splide;
	let slider = SplideSlide;

	if (!photos) {
		photos = [{ image: '../src/lib/img/pig-in-a-hat.jpeg' }];
	}

	const main_options = {
		type: 'loop',
		perPage: 1,
		perMove: 1,
		pagination: false,
		height: 520
	};

	const thumb_options = {
		rewind: true,
		fixedWidth: 250,
		focus: 'center',
		isNavigation: true,
		autoplay: {autoplay},
		arrows: false
	};

	onMount( () => {
		if (slider && splide) {
			splide.sync(slider.splide);
		}
	});
</script>

<div class="splide-wrapper" transition:fade>
	<Splide id="main-carousel" options="{main_options}" bind:this={splide}>
		{#if (first_slide)}
			<SplideSlide>
				<PhotoView src="{first_slide}" no_border />
			</SplideSlide>
		{/if}
		{#each photos as item}
			<SplideSlide>
				{#if linked}
				<a href="/looking-for-home/{item.id}">
					<PhotoView src={temp_address + item.image + '.jpg'} {no_border} {linked} />
				</a>
				{:else}
				<PhotoView src={temp_address + item.image + '.jpg'} {no_border} {linked} />
				{/if}
			</SplideSlide>
		{/each}
	</Splide>

	<Splide id="thumb-splide" options="{thumb_options}" bind:this={slider}>
			{#if (first_slide)}
				<SplideSlide>
					<img src="{first_slide}" width="200" height="200">
				</SplideSlide>
			{/if}
		{#each photos as item}
			<SplideSlide>
				<PhotoCard pic={item.image} />
			</SplideSlide>
		{/each}
	</Splide>
</div>