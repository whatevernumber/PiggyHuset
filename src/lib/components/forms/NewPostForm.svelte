<script>
    import Form from "$lib/components/forms/Form.svelte";

    export let title;
	export let method;
	export let endpoint = '/articles/type/2';

	let modal_message = 'Пост опубликован.';

    const scheme = {
        title: title || 'Новая публикация',
        endpoint: endpoint,
        fields: [
            {
                label: 'Заголовок публикации',
                name: 'title',
                required: true
            },
            {
                label: 'Текст публикации',
                name: 'text',
                type: 'textarea',
                required: true,
                placeholder: 'Расскажите новость',
                emoji: true
            }
        ],
        files: {
            file_input: true,
            multiple: true
        }
    }
</script>

<Form {scheme} {modal_message} {method} redirect_location="articles" />