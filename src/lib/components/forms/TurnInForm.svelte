<script>
    import Form from "$lib/components/forms/Form.svelte";

    export let title = '';

    const scheme = {
        title: title || 'Форма для связи',
        description: 'Если вы хотите передать нам свою свинку, ' +
            'пожалуйста, заполните данные о состоянии свинки и свой контактный номер. ' +
            'Вы также можете написать напрямую в сообщения в нашей группе ВК.',
        endpoint: '/requests',
        fields: [
            {
                label: 'Имя свинки',
                name: 'name'
            },
            {
                label: 'Возраст свинки',
                name: 'age'
            },
            {
                label: 'Состояние здоровья',
                name: 'description',
                type: 'textarea',
                required: true,
                placeholder: 'Пожалуйста, не утаивайте проблемы со здоровьем,\n' +
                    'мы всё равно о них узнаем.\n' +
                    '\n' +
                    'Так мы сможем лучше помочь животному',
				emoji: true
            },
            {
                label: 'Ваше имя',
                name: 'owner_name'
            },
            {
                label: 'Контакты для связи',
                name: 'owner_number',
                required: true
            }
        ],
        files: {
            file_input: true,
            multiple: true
        }
    }
</script>

<Form {scheme} />