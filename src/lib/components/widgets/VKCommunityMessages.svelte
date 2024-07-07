<script>
    import {onMount} from "svelte";

    onMount(
        () => {
			try {
				VK.Widgets.CommunityMessages('vk-messages', 127412463, {
					tooltipButtonText: 'Связаться с нами'
				});
			} catch (_) {
				// ignore
			}
        }
    );
</script>

<div id="vk-messages"></div>
