// Add copy button to snippets
import { Button, Input } from "@brtvcl/arcui";

function fallbackCopyTextToClipboard(text) {
    let textArea = document.createElement("textarea");
    textArea.value = text;

    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        document.execCommand('copy');
    } catch (err) {
        console.error('Unable to copy', err);
    }

    document.body.removeChild(textArea);
}

function copyTextToClipboard(text) {
    if (!navigator.clipboard) {
        fallbackCopyTextToClipboard(text);
        return;
    }
    navigator.clipboard.writeText(text)
        .catch((err) => {
            console.error('Could not copy text: ', err);
        });
}

// Add Snippet Copy Button to all snippets
let snippets = document.querySelectorAll(".snippet");
snippets.forEach((snippet) => {
    const snippetHeader = document.createElement("div");
    snippetHeader.classList.add("snippet-header");
    snippet.prepend(snippetHeader);
    
    const copyButtonContainer = document.createElement("div");
    snippetHeader.append(copyButtonContainer);
    // Add copy button element
    const copyButton = new Button({
        variant: "outline",
        size: "small",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="24"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z" /></svg>`,
        square: true,
    }, copyButtonContainer);

    // When clicked animate "Copied!" text and disable button for few seconds
    copyButton.on("click", () => {
        copyTextToClipboard(snippet.innerText);

        copyButton.update({
            disabled: true
        });

       const snippetCopiedText = document.createElement("div");
       snippetCopiedText.classList.add("snippet-copied");
       snippetCopiedText.innerText = "Copied!";
       snippetHeader.prepend(snippetCopiedText);

       snippetCopiedText.addEventListener("animationend", () => {
        copyButton.update({
            disabled: false
           });
        snippetCopiedText.remove();
       });
      

    });
    
    
});


// Search bar
new Input({
    size: "small",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ACAFBA" class="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
  </svg>
  `,
  width: "180px",
}, document.getElementById("searchbar"))