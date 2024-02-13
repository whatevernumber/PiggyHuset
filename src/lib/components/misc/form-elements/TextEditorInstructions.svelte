<script>
    import {fade} from "svelte/transition";
</script>

<aside class="text-editor-instructions" transition:fade>
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
        <li>
            Смайлики можно вставлять в текст через двоеточие – например <code>:pig</code>;
        </li>
    </ul>
</aside>

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
                    background: url("/src/lib/img/icons-edit.png");
                    background-size: cover;
                    margin-right: 7px;
                }

                & code {
                    display: contents;
                    color: #D97544;
                    font-size: 16px;
                    font-weight: 600;
                }
            }
        }
    }

    @media (max-width:1001px) {
        .text-editor-instructions {
            position: static;
            max-width: 100%;
            margin: 0 auto;
        }

        .text-editor-instructions li {
            padding-left: 24px;
        }

        .text-editor-instructions.text-editor-instructions li::before {
            left: -3%;
        }
    }
</style>