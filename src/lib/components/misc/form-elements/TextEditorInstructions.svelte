<section class="text-editor-instructions">
    <h3>Памятка по форматированию:</h3>
    <ul>
        <li>
            Нежелательно начинать статью с картинки;
        </li>
        <li>
            Текст должен быть разбит на абзацы;
        </li>
        <li>
            Строка текста сразу после картинки становится подписью к картинке;
        </li>
        <li>
            Для картинки без подписи можно сделать двойной перенос строки после картинки;
        </li>
    </ul>
</section>

<style>
    .text-editor-instructions {
        position: absolute;
        top: 35%;
        right: 6%;
        width: 350px;
        background-color: #e1edce;
        padding: 2% 2% 2% 4%;

        & h3 {
            color: #D97544;
        }

        & ul {
            padding: 0;
            position: relative;
            display: flex;
            flex-direction: column;
            row-gap: 25px;

            & li {
                display: inline-flex;
                align-items: center;
                font-family: Jost, "Courier New", sans-serif;
                list-style: none;
                text-decoration: underline 1px dashed #88aa4d;
                text-align: justify;

                &::before {
                    content: "";
                    position: absolute;
                    left: -12%;
                    display: inline-flex;
                    width: 30px;
                    height: 30px;
                    background: url("../src/lib/img/icons-edit.png");
                    background-size: cover;
                    margin-right: 7px;
                }
            }
        }
    }
</style>