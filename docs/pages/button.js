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

const primaryButtonJsCode = `
    import { Button } from '@brtvcl/arcui';
    import '@brtvcl/arcui/dist/bundle.css';

    new Button({
        variant: 'primary',
        text: 'Primary',
        width: '200px'
    }, document.getElementById('primary-button'));`;

const primaryButtonReactCode = `
    import { Button } from '@brtvcl/arcui';
    import '@brtvcl/arcui/dist/bundle.css';

    <Button variant="primary" width="200px">
        Primary
    <Button>`;

new Tabs({
    items: [
        {
            key: "vanilla",
            label: `<img width="24" src="/img/js.svg"/>`,
            children: highlightJsCode(primaryButtonJsCode, "javascript"),
        },
        {
            key: "react",
            label: `<img width="24" src="/img/react.svg"/>`,
            children: highlightJsCode(primaryButtonReactCode, "jsx"),
        }
    ]
}, document.getElementById("primary-button-code"));

// Secondary Button
new Button({
    variant: 'secondary',
    text: 'Secondary',
    width: '200px',
}, document.getElementById('secondary-button'));

const secondaryButtonJsCode = `
    import { Button } from '@brtvcl/arcui';
    import '@brtvcl/arcui/dist/bundle.css';

    new Button({
        variant: 'secondary',
        text: 'Secondary',
        width: '200px'
    }, document.getElementById('secondary-button'));`;

new Tabs({
    items: [
        {
            key: "vanilla",
            label: `<img width="24" src="/img/js.svg"/>`,
            children: highlightJsCode(secondaryButtonJsCode, "javascript")
        },
    ]
}, document.getElementById("secondary-button-code"));

// Outline Button
new Button({
    variant: 'outline',
    text: 'Outline',
    width: '200px',
}, document.getElementById('outline-button'));

const outlineButtonJsCode = `
    import { Button } from '@brtvcl/arcui';
    import '@brtvcl/arcui/dist/bundle.css';

    new Button({
        variant: 'outline',
        text: 'Outline',
        width: '200px'
    }, document.getElementById('outline-button'));`;

new Tabs({
    items: [
        {
            key: "vanilla",
            label: `<img width="24" src="/img/js.svg"/>`,
            children: highlightJsCode(outlineButtonJsCode, "javascript")
        },
    ]
}, document.getElementById("outline-button-code"));

// Ghost Button
new Button({
    variant: 'ghost',
    text: 'Ghost',
    width: '200px',
}, document.getElementById('ghost-button'));

const ghostButtonJsCode = `
    import { Button } from '@brtvcl/arcui';
    import '@brtvcl/arcui/dist/bundle.css';

    new Button({
        variant: 'ghost',
        text: 'Ghost',
        width: '200px'
    }, document.getElementById('ghost-button'));`;

new Tabs({
    items: [
        {
            key: "vanilla",
            label: `<img width="24" src="/img/js.svg"/>`,
            children: highlightJsCode(ghostButtonJsCode, "javascript")
        },
    ]
}, document.getElementById("ghost-button-code"));

// Disabled Button
new Button({
    variant: 'secondary',
    text: 'Disabled',
    width: '200px',
    disabled: true
}, document.getElementById('disabled-button'));

const disabledButtonJsCode = `
    import { Button } from '@brtvcl/arcui';
    import '@brtvcl/arcui/dist/bundle.css';

    new Button({
        variant: 'secondary',
        text: 'Disabled',
        width: '200px'
        disabled: true,
    }, document.getElementById('disabled-button'));`;

new Tabs({
    items: [
        {
            key: "vanilla",
            label: `<img width="24" src="/img/js.svg"/>`,
            children: highlightJsCode(disabledButtonJsCode, "javascript")
        },
    ]
}, document.getElementById("disabled-button-code"));

// Loading Button
new Button({
    variant: 'secondary',
    text: 'Loading',
    width: '200px',
    loading: true,
}, document.getElementById('loading-button'));

const loadingButtonJsCode = `
    import { Button } from '@brtvcl/arcui';
    import '@brtvcl/arcui/dist/bundle.css';

    new Button({
        variant: 'secondary',
        text: 'Loading',
        width: '200px'
        loading: true,
    }, document.getElementById('loading-button'));`;

new Tabs({
    items: [
        {
            key: "vanilla",
            label: `<img width="24" src="/img/js.svg"/>`,
            children: highlightJsCode(loadingButtonJsCode, "javascript")
        },
    ]
}, document.getElementById("loading-button-code"));

// Small Button
new Button({
    variant: 'secondary',
    text: 'Small',
    width: '150px',
    size: 'small'
}, document.getElementById('small-button'));

const smallButtonJsCode = `
    import { Button } from '@brtvcl/arcui';
    import '@brtvcl/arcui/dist/bundle.css';

    new Button({
        variant: 'secondary',
        text: 'Small',
        width: '150px',
        size: 'small'
    }, document.getElementById('small-button'));`;

new Tabs({
    items: [
        {
            key: "vanilla",
            label: `<img width="24" src="/img/js.svg"/>`,
            children: highlightJsCode(smallButtonJsCode, "javascript")
        },
    ]
}, document.getElementById("small-button-code"));

// Large Button
new Button({
    variant: 'secondary',
    text: 'Large',
    width: '150px',
    size: 'large',
}, document.getElementById('large-button'));

const largeButtonJsCode = `
    import { Button } from '@brtvcl/arcui';
    import '@brtvcl/arcui/dist/bundle.css';

    new Button({
        variant: 'secondary',
        text: 'Large',
        width: '150px',
        size: 'large'
    }, document.getElementById('large-button'));`;

new Tabs({
    items: [
        {
            key: "vanilla",
            label: `<img width="24" src="/img/js.svg"/>`,
            children: highlightJsCode(largeButtonJsCode, "javascript")
        },
    ]
}, document.getElementById("large-button-code"));

// Icon Button
new Button({
    variant: 'outline',
    text: 'Icon',
    width: '150px',
    icon: '🚀'
}, document.getElementById('icon-button'));

const iconButtonJsCode = `
    import { Button } from '@brtvcl/arcui';
    import '@brtvcl/arcui/dist/bundle.css';

    new Button({
        variant: 'outline',
        text: 'Icon',
        width: '150px',
        icon: '🚀'
    }, document.getElementById('icon-button'));`;

new Tabs({
    items: [
        {
            key: "vanilla",
            label: `<img width="24" src="/img/js.svg"/>`,
            children: highlightJsCode(iconButtonJsCode, "javascript")
        },
    ]
}, document.getElementById("icon-button-code"));

// Square Button
new Button({
    variant: 'outline',
    text: 'Icon',
    width: '150px',
    icon: '🗑️',
    square: true,
}, document.getElementById('square-button'));

const squareButtonJsCode = `
    new Button({
        variant: 'outline',
        text: 'Icon',
        width: '150px',
        icon: '🗑️',
        square: true,
    }, document.getElementById('square-button'));`;

new Tabs({
    items: [
        {
            key: "vanilla",
            label: `<img width="24" src="/img/js.svg"/>`,
            children: highlightJsCode(squareButtonJsCode, "javascript")
        },
    ]
}, document.getElementById("square-button-code"));