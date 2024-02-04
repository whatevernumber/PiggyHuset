<script>
    import {onMount} from "svelte";

    const move_to_top = function () {
        const return_button = document.querySelector('.return-button');
        if (window.scrollY > 100) {
            return_button.classList.add('topped');
        } else {
            return_button.classList.remove('topped');
        }
    }

    const go_back = () => {
        document.removeEventListener('scroll', move_to_top);
        history.back();
    };

    onMount(() => document.addEventListener('scroll', move_to_top));
</script>

<div class="return-button" on:click={go_back} on:keypress={(e) => {if (e.key === 'Enter') go_back()}} role="button" aria-pressed="false" tabindex="0" title="Вернуться к списку">
    <span class="return-button-text">
        Вернуться к списку
    </span>
</div>

<style>
    .return-button {
        position: fixed;
        height: 100%;
        margin: 100px 0 0 40px;
        color: #D97544;
        font-weight: 600;
        cursor: pointer;
        opacity: 0.65;

        &:hover {
            opacity: 1;
         }

        &.topped {
            margin-top: 40px;
         }
    }
</style>