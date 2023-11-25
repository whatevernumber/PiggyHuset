<script>
	export let class_name = "edit";
</script>
<a class="button {class_name}">
	<span class="{class_name}"></span>
</a>

<style>

	.button {
			width: 30px;
			height: 20px;
			display: block;
			background-color: #d97544;
	}
	.edit {
			background-image: url('$lib/img/icons-edit.png') ;
			background-repeat: no-repeat;
			background-position: center;
	}

	.delete {
			background-image: url('$lib/img/icons-delete.png');
      background-repeat: no-repeat;
	}
</style>