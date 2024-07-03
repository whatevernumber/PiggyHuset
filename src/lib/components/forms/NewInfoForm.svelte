<script>
	import Form from "$lib/components/forms/Form.svelte";

	export let modal;
	export let title = 'Новая карточка';
	export let method;
	export let is_editing;
	export let endpoint = 'info/add';
	export let product;

	let redirect_location = "info";
	let modal_message = 'Запись опубликована';

	const scheme = {
		title: title,
		endpoint: endpoint,
		fields: [
			{
				label: 'Название',
				name: 'title',
				required: true,
			},
			{
				label: 'Синонимы',
				name: 'synonyms',
			},
			{
				label: 'Описание',
				name: 'desc',
				type: 'textarea',
			},
			{
				label: 'Разрешено',
				name: 'allowed',
			},
			{
				label: 'Запрещено',
				name: 'restrictions',
			},
			{
				label: 'Примечание',
				name: 'notes',
			},
			{
				label: 'Дозировка',
				name: 'doses',
			},
			{
				label: 'Тип',
				name: 'food',
				type: 'select',
				required: true,
			},
		],
		files: {
			file_input: true,
			multiple: false,
		}
	};
</script>

<Form {scheme} {modal_message} {modal} {redirect_location} {method} {is_editing} {product}>
	<slot/>
</Form>