<script>
    import {quill} from "$lib/components/utils/quill.js";
    import "quill-emoji/dist/quill-emoji.css";
    export let input;
    let content;

    const colors = ['black', '#88aa4d', '#D97544', '#adadad', '#F6B5D3', '#e1edce', '#F0F8FF', 'white', 'red', 'purple'];
    const options = {
        modules: {
            "toolbar": [
                [{ header: [1, 2, 3, false] }],
                ["bold", "italic", "underline", "strike"],
                ["blockquote", "link", "image"], // прикрепление ссылки и изображения
                [
                    {"color": colors}, // цвет текста
                    { 'background': colors } // цвет фона текста
                ],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                ["emoji"],
            ],
            "emoji-toolbar": true,
            "emoji-textarea": true,
            "emoji-shortname": true
        },
        placeholder: "(Текст статьи)",
        theme: "snow"
    }

    const fill_in = function (e) {
        content = e.detail;
        input.value = e.detail.html;
    }
</script>

<svelte:head>
    <link href="//cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">
</svelte:head>

<div class="editor" id="wysiwyg">
    <div id="editor" use:quill={options} on:text-change={fill_in}></div>
</div>