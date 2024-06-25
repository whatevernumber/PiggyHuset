<script>
	import TextInput from '$lib/components/misc/form-elements/TextInput.svelte';
	import SubmitButton from '$lib/components/misc/form-elements/SubmitButton.svelte';
	import ArticleHeader from '$lib/components/misc/h-headers/ArticleHeader.svelte';
	import {onMount} from "svelte";
	import {goto} from "$app/navigation";

	export let data;
	let errors;

	async function sendForm () {
		const form = document.querySelector('form');
		const formData = new FormData(form);
		const res = await fetch('/api/admin/login', {
			method: 'POST',
			body: formData
		});

		// убирать класс ошибки при вводе новых значений
		form.querySelectorAll('input').forEach(
			(input) => {
				input.addEventListener('input',
					() => {
						if (input.classList.contains('input-error'))
							input.classList.remove('input-error');
					});
			}
		);

		if (res.ok) {
			goto('/admin/overview');

		} else {
			errors = await res.json();

			for (const prop in errors) {
				const field = document.querySelector(`[name=${prop}]`);
				const label = document.querySelector(`[name=${prop}] ~ .input-error-label`);
				label.textContent = errors[prop];
				field.classList.add('input-error');
				field.value = '';
			}

			const password_field = document.querySelector(`[name='password']`);
			password_field.value = '';
		}
	}

	onMount(() => {
		// отправка формы по кнопке Enter
		document.querySelectorAll('input').forEach(
			(input) => {
				input.addEventListener('keydown', (evt) => {
					if (evt.key === 'Enter') {
						input.form.lastElementChild.click();
					}
				});
			}
		);
	})
</script>

<svelte:head>
	<title>Логин</title>
</svelte:head>


<div class="form_wrapper">
	<ArticleHeader size="16px" text="Вход в кабинет" />
	<form method="post" name="login_form" class="login_form">
		<TextInput width="300px" required='required' name="name" placeholder="Имя пользователя"/>
		<TextInput width="300px" required='required' name="password" placeholder="Пароль" type="password"/>
		<SubmitButton title='Войти' on_click={sendForm} />
	</form>
</div>

<style>
	.login_form {
		margin-top: 15px;
		display: flex;
		flex-direction: column;
		row-gap: 25px;
		align-items: center;
	}

	.form_wrapper {
      	margin: auto;
		max-width: 200px;
	}

	@media (max-width: 1001px) {
		.form_wrapper {
			max-width: 100%;
		}
	}
</style>