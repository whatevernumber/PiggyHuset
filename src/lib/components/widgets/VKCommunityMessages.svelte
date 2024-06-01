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

<svelte:head>
    <script src="https://vk.com/js/api/openapi.js?169" type="text/javascript"></script>
</svelte:head>

<div id="vk-messages"></div>