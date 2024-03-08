<script>
	import PhotoCard from "$lib/components/photo-card/PhotoCard.svelte";
	import PhotoView from "$lib/components/misc/modal/PhotoView.svelte";
	import {onMount, afterUpdate} from "svelte";
	import {Splide, SplideSlide} from "@splidejs/svelte-splide";
	import '@splidejs/svelte-splide/css/splide.min.css';
	import {fade} from "svelte/transition";
	import {_REMOTE_SERVER} from "$env/static/public";
	import LinkWithReferrer from "$lib/components/misc/links/LinkWithReferrer.svelte";

	export let autoplay = false;
	export let first_slide = false;
	export let linked = false;
	export let photos;
	export let local = false;
	export let no_border = false;

	let temp_address = local ? '/img/' : _REMOTE_SERVER + '/img/';
	let window_width = 0;

	let splide = Splide;
	let slider = SplideSlide;

	if (!photos) {
		photos = [{ image: '../static/img/pig-in-a-hat.jpeg' }];
	}

	let main_options = {
		type: 'loop',
		perPage: 1,
		perMove: 1,
		pagination: false,
		height: 520,
	};

	let thumb_options = {
		rewind: true,
		fixedWidth: 250,
		focus: 'center',
		isNavigation: true,
		autoplay: autoplay,
		arrows: false
	};

	onMount( () => {
		if (slider && splide) {
			splide.sync(slider.splide);
		}
	});

	afterUpdate(() => {
		if (slider && splide) {
			splide.sync(slider.splide);
		}
	});

	$: if (window_width < 1000 && window_width !== 0) {
		main_options.height = 300;
		thumb_options.fixedWidth = 200;
	} else {
		main_options.height = 520;
		thumb_options.fixedWidth = 250;
	}

</script>

<svelte:window bind:innerWidth={window_width} />

<div class="splide-wrapper" transition:fade>
	<Splide id="main-carousel" options="{main_options}" bind:this={splide}>
		{#if (first_slide)}
			<SplideSlide>
				<PhotoView src="{first_slide}" no_border no_shadow />
			</SplideSlide>
		{/if}
		{#each photos as item}
			<SplideSlide>
				{#if linked}
				<LinkWithReferrer href="/looking-for-home/{item.id}">
					<PhotoView src={temp_address + item.image} {no_border} {linked} />
				</LinkWithReferrer>
				{:else}
				<PhotoView src={temp_address + item.image} {no_border} {linked} />
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
				<PhotoCard pic={item.image} src={temp_address + item.image} />
			</SplideSlide>
		{/each}
	</Splide>
</div>
