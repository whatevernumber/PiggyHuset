<script>
    import Banner from "../banner/Banner.svelte";
    import About from "../about/About.svelte";
    import LookingForHouse from "../looking-for-house/LookingForHouse.svelte";
    import Graduated from "../graduated/Graduated.svelte";
    import AboutModal from "../modal/AboutModal.svelte";
</script>


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
