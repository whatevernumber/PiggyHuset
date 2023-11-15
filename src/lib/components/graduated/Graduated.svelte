<script>
    import Button from "../button/Button.svelte";
    import GraduatedCard from "../graduate-card/GraduatedCard.svelte";
    import BigHeader from "$lib/components/misc/BigHeader.svelte";
</script>

<section class="graduated">
    <BigHeader textContent="Наши выпускники" />
    <div class="graduated_cards_wrapper">
        <GraduatedCard />
        <GraduatedCard />
        <GraduatedCard />
    </div>
    <Button title="Посмотреть всех" background_color="#D97544" text_color="#FFFFFF" />
</section>


<style>

    .graduated {
        margin-bottom: 40px;
        padding: 0 80px;
    }

    .graduated_cards_wrapper {
        display: flex;
        justify-content: space-between;
        margin-bottom: 40px;
    }
</style>