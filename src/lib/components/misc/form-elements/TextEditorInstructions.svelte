<script>
    import {fade} from "svelte/transition";

    let screen_width;
</script>

<svelte:window bind:innerWidth={screen_width} />

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
            Абзац, следующий сразу за картинкой, становится подписью к картинке;
        </li>
        <li>
            Для картинки без подписи можно сделать двойной перенос строки после картинки;
        </li>
    {#if screen_width >= 1000}
        <li>
            Смайлики можно вставлять в текст через двоеточие – например <code>:pig</code>;
        </li>
    {:else}
        <li>
            Смайлики лучше добавлять из клавиатуры смартфона;
        </li>
    {/if}
        <li>
            Можно переносить статьи из VK, для этого нужно выделить всё содержимое статьи, скопировать и вставить в поле для текста;
        </li>
    </ul>
</aside>

<style>
    .text-editor-instructions {
        position: absolute;
        top: 25%;
        right: 3%;
        width: 350px;
        background-color: #e1edce;
        padding: 2% 2% 2% 4%;
    }

    .text-editor-instructions h3 {
        color: #D97544;
    }

    .text-editor-instructions ul {
        padding: 0;
        position: relative;
        display: flex;
        flex-direction: column;
        row-gap: 25px;
    }

    .text-editor-instructions li {
        display: inline-flex;
        align-items: center;
        font-family: Jost, "Courier New", sans-serif;
        list-style: none;
        text-decoration: underline 1px dashed #88aa4d;
        text-align: justify;
    }

    .text-editor-instructions li::before {
        content: "";
        position: absolute;
        left: -12%;
        display: inline-flex;
        width: 30px;
        height: 30px;
        background: url("/../src/lib/img/icons-edit.png");
        background-size: cover;
        margin-right: 7px;
    }

    .text-editor-instructions code {
        display: contents;
        color: #D97544;
        font-size: 16px;
        font-weight: 600;
    }

    @media (max-width:1700px) {
        .text-editor-instructions {
            position: static;
            max-width: 75vw;
            margin: 0 auto 5%;
            padding: 6%;
        }

        .text-editor-instructions li {
            padding-left: 24px;
        }

        .text-editor-instructions.text-editor-instructions li::before {
            left: -3%;
        }
    }

    @media (min-width: 1301px) and (max-width: 1780px) {
        .text-editor-instructions {
            max-width: 25vw;
            right: 1%;
        }
    }

    :global(.modal.modal_opened ~ aside) {
        filter: blur(10px);
    }
</style>
