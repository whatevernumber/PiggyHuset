<script>
	import Form from "$lib/components/forms/Form.svelte";

	export let modal;
	export let title = 'Новая карточка';
	export let method;
	export let is_editing;
	export let endpoint = 'info/add';
	export let product;
	export let options;

	let redirect_location = "info";
	let modal_message = 'Запись опубликована';

	let selected = product ?
		product.categories.map((cat) => {
			return cat.id.toString();
		}) : null;

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
				name: 'types',
				type: 'choices',
				options: options,
				selected: selected,
				multiple: true,
				required: true,
			},
			{
				label: 'Запрещено',
				name: 'is_banned',
				type: 'checkbox',
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