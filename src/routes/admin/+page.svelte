<script>
	import TextInput from '$lib/components/misc/form-elements/TextInput.svelte';
	import SubmitButton from '$lib/components/misc/form-elements/SubmitButton.svelte';
	import ArticleHeader from '$lib/components/misc/h-headers/ArticleHeader.svelte';
	import ModalOkay from '../../lib/components/misc/modal/ModalOkay.svelte';
</script>

<div class="form_wrapper">
	<ArticleHeader size="16px" text="Вход в кабинет" />
	<form method="post" name="login_form" class="login_form">
		<TextInput width="300px" required='required' name="login" placeholder="" header="Логин"/>
		<TextInput width="300px" required='required' name="password" placeholder="" type="password" header="Пароль"/>
		<SubmitButton title='Войти' />
	</form>
	<ModalOkay />
</div>

<style>
	.login_form {
			margin-top: 15px;
			display: flex;
			flex-direction: column;
			row-gap: 25px;
			align-items: center;
	}

	.article_wrapper {
			margin: auto;
	}

	.form_wrapper {
      margin: auto;
			max-width: 200px;
	}
</style>