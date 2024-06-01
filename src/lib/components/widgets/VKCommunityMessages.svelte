<script>
    import {onMount} from "svelte";

    onMount(
        () => {
            VK.Widgets.CommunityMessages("vk-messages", 127412463, {
                tooltipButtonText: 'Связаться с нами'
            });
        }
    );
</script>

<div id="vk-messages"></div>
