import Quill from "quill";
import * as Emoji from "quill-emoji";

function quill(node, options) {
    const quill = new Quill(node, {
        modules: {
            toolbar: [
                [{ header: [1, 2, 3, false] }],
                ["bold", "italic", "underline", "strike"],
                ["link", "code-block"]
            ]
        },
        placeholder: "Type something...",
        theme: "snow", // or 'bubble'
        ...options
    });
    Quill.register("modules/emoji", Emoji);

    const container = node.querySelector(".ql-editor");

    quill.on("text-change", function(delta, oldDelta, source) {
        node.dispatchEvent(
            new CustomEvent("text-change", {
                detail: {
                    html: container.innerHTML,
                    text: quill.getText(),
                    data: JSON.stringify(quill.getContents())
                },
            })
        );
    });
}

export { quill };