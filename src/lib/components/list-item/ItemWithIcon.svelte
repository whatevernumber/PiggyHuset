<script>
	import EditButton from '../misc/button/EditButton.svelte';

	export let text = '';
	export let href = '/';
	export let icon = 'list-icon-pink.png';
	export let icon_name = 'edit';
</script>

<a class="option-item-link" {href}>
	<li class="option-item">
		{text}
	</li>
	<EditButton class_name={icon_name} />
</a>

<style>

	.option-item-link {
			display: flex;
			column-gap: 15px;
			font-size: 24px;
	}
</style>