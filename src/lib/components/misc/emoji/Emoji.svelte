<script>
	import 'emoji-picker-element';
	import ru from 'emoji-picker-element/i18n/ru_RU.js';

	export let input_name;

	function pick (evt) {
		const input_field = document.getElementById(input_name);
		input_field.value = input_field.value + evt.detail.unicode;
	}
</script>

<div class='emoji_button'></div>
<div class='emoji_wrapper modal_closed'>
	<emoji-picker on:emoji-click={pick}
				  i18n={ru}
				  locale="ru"
				  data-source='https://cdn.jsdelivr.net/npm/emoji-picker-element-data@^1/ru/emojibase/data.json'
	/>
</div>

<style>
    .emoji_wrapper {
        position: absolute;
        right: 12px;
        z-index: -4;
        top: 200px;
        opacity: 0;
        transition: top 0.2s, opacity 0.3s, z-index 0.3s;
    }

    .emoji_button {
        position: absolute;
        width: 30px;
        height: 30px;
        right: 13px;
        bottom: 5px;
        background-image: url("/src/lib/img/smile.png");
        background-position: center;
        background-size: 18px 18px;
        background-repeat: no-repeat;
    }

    .emoji_button:hover {
        border-radius: 50%;
        background-color: #EF8653;
    }

    .emoji_button:hover + .emoji_wrapper {
        opacity: 1;
        z-index: 10;
        top: 70%;
    }

	.emoji_wrapper:hover {
        opacity: 1;
        z-index: 10;
	}

</style>