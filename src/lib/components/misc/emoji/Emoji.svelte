<script>
	import 'emoji-picker-element';
	import ru from 'emoji-picker-element/i18n/ru_RU.js';

	export let input_name;

	function pick (evt) {
		const input_field = document.getElementById(input_name);
		input_field.value = input_field.value + evt.detail.unicode;
	}
</script>

<div class='emoji_button' on:click={function () {this.classList.toggle('active')}}></div>
<div class='emoji_wrapper'>
	<emoji-picker on:emoji-click={pick}
				  i18n={ru}
				  locale="ru"
				  data-source='https://cdn.jsdelivr.net/npm/emoji-picker-element-data@^1/ru/emojibase/data.json'></emoji-picker>
</div>

<style>
    .emoji_wrapper {
		max-height: 300px;
        position: absolute;
        top: 100%;
		right: 4%;
		z-index: -4;
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
        right: 5%;
    }

    .emoji_button:hover + .emoji_wrapper,
	:global(.emoji_button.active + .emoji_wrapper) {
        opacity: 1;
        z-index: 10;
        top: 100%;
    }

	.emoji_wrapper:hover {
        opacity: 1;
        z-index: 10;
	}

	@media (max-width: 400px) {
		.emoji_wrapper {
			max-width: 300px;
		}
	}

	@media (max-width: 350px) {
		.emoji_wrapper {
			transform: scale(0.8) translate(10%, -10%)
		}
	}

    @media (max-width: 1001px) {
		.emoji_wrapper {
            right: 0;
		}

        .emoji_button {
            border-radius: 50%;
            background-color: #EF8653;
        }
    }

	emoji-picker {
		max-width: inherit;
		max-height: inherit;
	}
</style>