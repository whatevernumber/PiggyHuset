<script>
	import { browser } from '$app/environment';

	const hideCookies = function() {
		if (browser) {
			localStorage.setItem('hide-cookies', '1');
			document.querySelector('.cookies').remove();
		}
	};
</script>

<div class="cookies">
	<img src="/img/cookies.png" alt="Свинка с печенькой" class="cookies-image" width="100" height="100">
	<div>
		<h3 class="cookies-header">У нас свои печеньки!</h3>
		<p class="cookies-text">Мы тоже используем cookies.</p>
		<p class="cookies-text">Они помогают нам анализировать работу сайта и улучшать ваш опыт.</p>
	</div>
	<button class="cookies-close-button" on:click={hideCookies}></button>
</div>

<style>
	.cookies {
        display: flex;
        min-width: 25vw;
        max-width: 30vw;
        height: 120px;
		padding: 0 10px;

		position: fixed;
		bottom: 65px;
        left: 0;
        right: 0;
		margin: 0 auto;

        justify-content: center;
        align-items: center;
		column-gap: 15px;

        background-color: aliceblue;
        font-size: 14px;

		opacity: 0.7;
		transition-duration: 0.15s;
        z-index: 10;
	}

	.cookies:hover {
        opacity: 1;
        background-color: #FFFFFF;
		box-shadow: 1px 1px 15px #adadad;
        transition-duration: 0.15s;
    }

	.cookies-close-button {
        width: 40px;
		height: 30px;
		position: absolute;
		right: 15px;
		top: 15px;
		background: url("/img/svg/close-ok.svg") no-repeat 50%;
		border: none;
		cursor: pointer;
	}

	.cookies-close-button:hover {
		background-image: url("/img/svg/ok.svg");
        /*border: 1px solid #e1edce;*/
	}

    @media (max-width: 1001px) {
		.cookies {
            bottom: 5px;
            max-width: 95vw;
			padding: 5px;

			font-size: 15px;

			opacity: 1;
			box-shadow: none;
        }
	}
</style>