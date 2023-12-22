<script>
	import SubmitButton from '$lib/components/misc/form-elements/SubmitButton.svelte';
	import PhotoCard from '$lib/components/photo-card/PhotoCard.svelte';
	import FileInput from '$lib/components/misc/form-elements/FileInput.svelte';
</script>

<section class="form-section">
	<h3 class="form-header">Добавить нового поросёнка</h3>
	<form class="turn-in-form">
		<fieldset class="label-group">
			<div class="form-item">
				<label class="form-label label-pig-name" for="animal-name">Имя</label>
				<input type="text" id="animal-name" placeholder="(Необязательно)">
			</div>

			<div class="form-item">
				<label class="form-label" for="animal-age">Возраст свинки</label>
				<input type="text" id="animal-age">
			</div>
		</fieldset>

		<fieldset class="label-group middle-group">
			<div class="form-item animal-health-set">
				<label class="form-label" for="animal-health">История свинки и состояние здоровья</label>
				<textarea id="animal-health"></textarea>
			</div>
		</fieldset>

		<fieldset>
			<div class="form-item">
				<label class="form-label" for="animal-age">Куратор</label>
				<input type="text" id="animal-curator">
			</div>
		</fieldset>

		<fieldset class="label-group">
			<FileInput />

			<div class="form-item button">
				<SubmitButton />
			</div>
		</fieldset>
		<div class='photo_preview'>
			<PhotoCard width='80px' height='80px' />
			<PhotoCard width='80px' height='80px' />
			<PhotoCard width='80px' height='80px' />
		</div>
	</form>
</section>

<style>
    .form-section {
		width: 600px;
        max-width: 600px;
        padding: 20px 40px;
        display: flex;
        flex-direction: column;
        row-gap: 20px;
        background-color: #FFFFFF;
    }

    .form-header {
        font-size: 24px;
        line-height: 130%;
        text-transform: uppercase;
    }

    .turn-in-form {
        display: grid;
        row-gap: 20px;
        align-items: stretch;
    }

    fieldset {
        border: none;
        display: flex;
        column-gap: 10px;
        align-items: center;
    }

    .form-item {
        width: 100%;
        display: flex;
        align-items: center;
		justify-content: space-between;
    }

	.button {
		justify-content: flex-end;
	}

    .form-label {
        text-transform: uppercase;
        flex-basis: 100px;
    }

    .form-label[for="animal-health"] {
        align-self: center;
        flex-basis: 40px;
    }

    .turn-in-form input,
    .turn-in-form textarea {
        background-color: rgba(225, 237, 206, 0.5);
        border: none;
        flex-grow: 1;
    }

    .turn-in-form input {
        height: 43px;
        text-indent: 10%;
    }

    .turn-in-form textarea {
        flex-grow: 2;
        max-width: 566px;
		min-width: 566px;
        min-height: 180px;
        max-height: 250px;
        padding: 10px;
    }

    .turn-in-form input::placeholder,
    .turn-in-form textarea::placeholder {
        color: rgba(51, 51, 51, 0.7);
        font-weight: 400;
        font-size: 16px;
    }

    .photo_preview {
		display: flex;
		column-gap: 10px;
		flex-wrap: wrap;
		padding: 5px 13px;
		}

	.animal-health-set {
		flex-direction: column;
	}

	.label-pig-name {
		flex-basis: 70px;
	}

</style>