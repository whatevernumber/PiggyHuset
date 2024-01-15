<script>
	import 'emoji-picker-element';
	import ru from 'emoji-picker-element/i18n/ru_RU.js';

	function pick (evt) {
		let textarea = document.querySelector('#animal-health');
		textarea.textContent = textarea.textContent + evt.detail.unicode;
	}
</script>

<div class='emoji_wrapper modal_closed'>
	<emoji-picker on:emoji-click={pick} i18n={ru}
				  locale="ru"
				  data-source='https://cdn.jsdelivr.net/npm/emoji-picker-element-data@^1/ru/emojibase/data.json'
	/>
</div>

<style>
    .emoji_wrapper {
        position: absolute;
        right: 12px;
        z-index: 10;
        top: 200px;
        opacity: 1;
        transition: top 0.2s, opacity 0.3s, z-index 0.4s;
    }

    .modal_closed {
        top: 92%;
        opacity: 0;
        z-index: -4;
    }

</style>