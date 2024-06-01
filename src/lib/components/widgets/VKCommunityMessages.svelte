<script>
    import {onMount} from "svelte";

    onMount(
        () => {
            VK?.Widgets.CommunityMessages("vk-messages", 206686432, {
                tooltipButtonText: 'Связаться с нами'
            });
        }
    );
</script>

<div id="vk-messages"></div>
