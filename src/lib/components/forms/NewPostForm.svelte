<script>
    import Form from "$lib/components/forms/Form.svelte";

    export let title;
	export let method;
	export let old_photos;
	export let is_editing;
	export let endpoint = 'articles/news/add';
    export let article;

	let modal_message = 'Пост опубликован';

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
                type: 'wysiwyg',
                required: true,
                placeholder: 'Расскажите новость',
                emoji: true
            },
            {
                label: 'Теги',
                name: 'hashtags',
                placeholder: 'Укажите теги через пробел',
            }
        ],
        files: {
            file_input: false,
            multiple: true
        }
    }
</script>

<Form {scheme} {modal_message} {method} {is_editing} {old_photos} {article} redirect_location="news">
    <slot />
</Form>