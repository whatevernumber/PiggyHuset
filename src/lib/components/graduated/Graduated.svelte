<script>
    import BigHeader from '$lib/components/misc/h-headers/BigHeader.svelte';
    import GraduatedCard from '$lib/components/cards/graduate-card/GraduatedCard.svelte';
    import Button from '$lib/components/misc/button/Button.svelte';
</script>

<section class="graduated">
    <BigHeader text_content="Наши выпускники" />
    <div class="graduated_cards_wrapper">
        <GraduatedCard name='Финик' />
        <GraduatedCard name='Блиник' />
        <GraduatedCard name='Сопливик' />
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