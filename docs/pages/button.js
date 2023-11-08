import {
    Button, Tabs,
} from '@brtvcl/arcui';
import '@brtvcl/arcui/dist/bundle.css';

import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-jsx";
import "prismjs/themes/prism.min.css";


function highlightJsCode(code, language) {
    return `<pre><code>${Prism.highlight(code, Prism.languages[language], language)}</code></pre>`;
}

// Primary Button
new Button({
    variant: 'primary',
    text: 'Primary',
    width: '200px'
}, document.getElementById('primary-button'));

const primaryButtonJsCode = `import { Button } from '@brtvcl/arcui';
import '@brtvcl/arcui/dist/bundle.css';

new Button({
    variant: 'primary',
    text: 'Primary',
    width: '200px'
}, document.getElementById('primary-button'));`;

document.getElementById('primary-button-js-code').innerHTML = highlightJsCode(primaryButtonJsCode, "javascript");

const primaryButtonReactCode = `import { Button } from '@brtvcl/arcui';
import '@brtvcl/arcui/dist/bundle.css';

<Button variant="primary" width="200px">
    Primary
<Button>`;

document.getElementById('primary-button-react-code').innerHTML = highlightJsCode(primaryButtonReactCode, "jsx");

// Secondary Button
new Button({
    variant: 'secondary',
    text: 'Secondary',
    width: '200px',
}, document.getElementById('secondary-button'));

const secondaryButtonJsCode = `import { Button } from '@brtvcl/arcui';
import '@brtvcl/arcui/dist/bundle.css';

new Button({
    variant: 'secondary',
    text: 'Secondary',
    width: '200px'
}, document.getElementById('secondary-button'));`;

document.getElementById("secondary-button-js-code").innerHTML = highlightJsCode(secondaryButtonJsCode, "javascript");

// Outline Button
new Button({
    variant: 'outline',
    text: 'Outline',
    width: '200px',
}, document.getElementById('outline-button'));

const outlineButtonJsCode = `import { Button } from '@brtvcl/arcui';
import '@brtvcl/arcui/dist/bundle.css';

new Button({
    variant: 'outline',
    text: 'Outline',
    width: '200px'
}, document.getElementById('outline-button'));`;

document.getElementById("outline-button-js-code").innerHTML = highlightJsCode(outlineButtonJsCode, "javascript");

// Ghost Button
new Button({
    variant: 'ghost',
    text: 'Ghost',
    width: '200px',
}, document.getElementById('ghost-button'));

const ghostButtonJsCode = `import { Button } from '@brtvcl/arcui';
import '@brtvcl/arcui/dist/bundle.css';

new Button({
    variant: 'ghost',
    text: 'Ghost',
    width: '200px'
}, document.getElementById('ghost-button'));`;

document.getElementById("ghost-button-js-code").innerHTML = highlightJsCode(ghostButtonJsCode, "javascript");

// Disabled Button
new Button({
    variant: 'secondary',
    text: 'Disabled',
    width: '200px',
    disabled: true
}, document.getElementById('disabled-button'));

const disabledButtonJsCode = `import { Button } from '@brtvcl/arcui';
import '@brtvcl/arcui/dist/bundle.css';

new Button({
    variant: 'secondary',
    text: 'Disabled',
    width: '200px'
    disabled: true,
}, document.getElementById('disabled-button'));`;

document.getElementById("disabled-button-js-code").innerHTML = highlightJsCode(disabledButtonJsCode, "javascript");



// Loading Button
new Button({
    variant: 'secondary',
    text: 'Loading',
    width: '200px',
    loading: true,
}, document.getElementById('loading-button'));

const loadingButtonJsCode = `import { Button } from '@brtvcl/arcui';
import '@brtvcl/arcui/dist/bundle.css';

new Button({
    variant: 'secondary',
    text: 'Loading',
    width: '200px'
    loading: true,
}, document.getElementById('loading-button'));`;

document.getElementById("loading-button-js-code").innerHTML = highlightJsCode(loadingButtonJsCode, "javascript");

// Small Button
new Button({
    variant: 'secondary',
    text: 'Small',
    width: '150px',
    size: 'small'
}, document.getElementById('small-button'));

const smallButtonJsCode = `import { Button } from '@brtvcl/arcui';
import '@brtvcl/arcui/dist/bundle.css';

new Button({
    variant: 'secondary',
    text: 'Small',
    width: '150px',
    size: 'small'
}, document.getElementById('small-button'));`;

document.getElementById("small-button-js-code").innerHTML = highlightJsCode(smallButtonJsCode, "javascript");

// Large Button
new Button({
    variant: 'secondary',
    text: 'Large',
    width: '150px',
    size: 'large',
}, document.getElementById('large-button'));

const largeButtonJsCode = `import { Button } from '@brtvcl/arcui';
import '@brtvcl/arcui/dist/bundle.css';

new Button({
    variant: 'secondary',
    text: 'Large',
    width: '150px',
    size: 'large'
}, document.getElementById('large-button'));`;

document.getElementById("large-button-js-code").innerHTML = highlightJsCode(largeButtonJsCode, "javascript");

// Icon Button
new Button({
    variant: 'outline',
    text: 'Icon',
    width: '150px',
    icon: '🚀'
}, document.getElementById('icon-button'));

const iconButtonJsCode = 
`import { Button } from '@brtvcl/arcui';
import '@brtvcl/arcui/dist/bundle.css';

new Button({
    variant: 'outline',
    text: 'Icon',
    width: '150px',
    icon: '🚀'
}, document.getElementById('icon-button'));`;

document.getElementById("icon-button-js-code").innerHTML = highlightJsCode(iconButtonJsCode, "javascript");

// Square Button
new Button({
    variant: 'outline',
    text: 'Icon',
    width: '150px',
    icon: '🗑️',
    square: true,
}, document.getElementById('square-button'));

const squareButtonJsCode = 
`new Button({
    variant: 'outline',
    text: 'Icon', // Won't render because square is true
    width: '150px',
    icon: '🗑️',
    square: true,
}, document.getElementById('square-button'));`;

document.getElementById("square-button-js-code").innerHTML = highlightJsCode(squareButtonJsCode, "javascript");




// Attach Event
const attachEventJsCode = `
const btn = new Button({
    variant: 'primary',
    text: 'Primary',
    width: '200px'
}, document.getElementById('primary-button'));

btn.on("click", () => {
    console.log("clicked");
});`;

// Detach Event
const detachEventJsCode = `
const btn = new Button({
    variant: 'primary',
    text: 'Primary',
    width: '200px'
}, document.getElementById('primary-button'));

// Attach click handler
const id = btn.on("click", () => {
    console.log("clicked");
});

// Remove click handler after 5 seconds
setTimeout(() => {
    btn.off(id);
}, 5000)
`;

// JS Events Code
document.getElementById("attach-event-js-code").innerHTML = highlightJsCode(attachEventJsCode, "javascript");
document.getElementById("detach-event-js-code").innerHTML = highlightJsCode(detachEventJsCode, "javascript");
