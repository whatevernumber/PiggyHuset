<script>
	export let class_name;
</script>

<div class='overlay {class_name}'></div>

<style>
	.overlay {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		backdrop-filter: blur(3px);
		z-index: 1;
	}

	.hidden {
		display: none;
	}
</style>