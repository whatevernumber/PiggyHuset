<script>
    import Button from "../button/Button.svelte";
    import GraduatedCard from "../graduate-card/GraduatedCard.svelte";
</script>

<section class="graduated">
    <h2 class="graduated_header">Наши Выпускники</h2>
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

    .graduated_header {
        margin-bottom: 40px;
        font-size: 36px;
        font-weight: 700;
        line-height: 115%;
        text-align: center;
        text-transform: uppercase;
    }

    .graduated_cards_wrapper {
        display: flex;
        justify-content: space-between;
        margin-bottom: 40px;
    }
</style>