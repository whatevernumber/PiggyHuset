<script>
	import Form from "$lib/components/forms/Form.svelte";

	export let modal;
	export let title = 'Новый поросёнок';
	export let method;
	export let is_editing;
	export let endpoint = 'pigs/add';
    export let pig;

	let redirect_location = "looking-for-home";
	let modal_message = 'Запись опубликована';

	const scheme = {
		title: title,
		endpoint: endpoint,
		fields: [
			{
				label: 'Имя',
				name: 'name',
				required: true,
			},
			{
				label: 'Возраст свинки',
				name: 'age',
			},
			{
				label: 'История свинки и состояние здоровья',
				name: 'description',
				type: 'textarea',
				required: true,
                emoji: true,
			},
			{
				label: 'Куратор',
				name: 'overseers',
                type: 'select',
                required: true,
                grouped: true,
                group_column: 'active'
			},
            {
                label: 'Город',
                name: 'cities',
                type: 'select',
                required: true,
            },
            {
                label: 'Пол',
                name: 'sex',
                type: 'select',
                options: [
                    {
                        id: 'M',
                        value: 'Мальчик',
                    },
                    {
                        id: 'F',
                        value: 'Девочка'
                    }
                ],
                required: true,
            },
            {
                label: 'id',
                name: 'id',
                type: 'number',
                required: true,
            },
            {
                label: 'Когда',
                name: 'datetime',
                type: 'date',
            },
            {
                label: 'Статус',
                name: 'statuses',
                type: 'select',
                required: true,
            },
            {
                label: 'Выпуск',
                name: 'graduation_date',
                type: 'date',
                required: true,
            },
            {
                label: 'Доставка',
                name: 'delivery',
                type: 'checkbox',
            },
		],
		files: {
			file_input: true,
			multiple: true,
		}
	};
</script>

<Form {scheme} {modal_message} {modal} {redirect_location} {method} {is_editing} {pig}>
    <slot/>
</Form>