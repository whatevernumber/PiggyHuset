<script>
	import Form from "$lib/components/forms/Form.svelte";

	export let modal;

	let redirect_location = "looking-for-home";
	let modal_message = 'Новая свинка успешно добавлена.';

	const scheme = {
		title: 'Новый поросёнок',
		endpoint: '/pigs',
		fields: [
			{
				label: 'Имя',
				name: 'name',
				required: true
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
                emoji: true
			},
			{
				label: 'Куратор',
				name: 'overseer',
			}
		],
		files: {
			file_input: true,
			multiple: true
		}
	};
</script>

<Form {scheme} {modal_message} {modal} {redirect_location} />