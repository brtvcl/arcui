import {
    Button, Tabs,
} from '@brtvcl/arcui';
import '@brtvcl/arcui/dist/bundle.css';


// Primary Button
new Button({
    variant: 'primary',
    text: 'Primary',
    width: '200px'
}, document.getElementById('primary-button'));

new Tabs({
    items: [
        {
            key: "vanilla",
            label: `<img width="32" src="/img/js.svg"/>`,
            children: `<pre>
            <code>
                import { Button } from '@brtvcl/arcui';
                import '@brtvcl/arcui/dist/bundle.css';

                new Button({
                    variant: 'primary',
                    text: 'Primary',
                    width: '200px'
                }, document.getElementById('primary-button'));
            </code>
        </pre>`
        },
        {
            key: "react",
            label: `<img width="32" src="/img/react.svg"/>`,
            children: `<pre>
            <code>
                import { Button } from '@brtvcl/arcui';
                import '@brtvcl/arcui/dist/bundle.css';

                &lt;Button variant="primary" width="200px">
                    Primary
                &lt;/Button&gt;
            </code>
        </pre>`
        }
    ]
}, document.getElementById("primary-button-code"));

// Secondary Button
new Button({
    variant: 'secondary',
    text: 'Secondary',
    width: '200px',
}, document.getElementById('secondary-button'));

new Tabs({
    items: [
        {
            key: "vanilla",
            label: `<img width="32" src="/img/js.svg"/>`,
            children: `<pre>
            <code>
                import { Button } from '@brtvcl/arcui';
                import '@brtvcl/arcui/dist/bundle.css';

                new Button({
                    variant: 'secondary',
                    text: 'Secondary',
                    width: '200px'
                }, document.getElementById('secondary-button'));
            </code>
        </pre>`
        },
    ]
}, document.getElementById("secondary-button-code"));

// Outline Button
new Button({
    variant: 'outline',
    text: 'Outline',
    width: '200px',
}, document.getElementById('outline-button'));

new Tabs({
    items: [
        {
            key: "vanilla",
            label: `<img width="32" src="/img/js.svg"/>`,
            children: `<pre>
            <code>
                import { Button } from '@brtvcl/arcui';
                import '@brtvcl/arcui/dist/bundle.css';

                new Button({
                    variant: 'outline',
                    text: 'Outline',
                    width: '200px'
                }, document.getElementById('outline-button'));
            </code>
        </pre>`
        },
    ]
}, document.getElementById("outline-button-code"));

// Ghost Button
new Button({
    variant: 'ghost',
    text: 'Ghost',
    width: '200px',
}, document.getElementById('ghost-button'));

new Tabs({
    items: [
        {
            key: "vanilla",
            label: `<img width="32" src="/img/js.svg"/>`,
            children: `<pre>
            <code>
                import { Button } from '@brtvcl/arcui';
                import '@brtvcl/arcui/dist/bundle.css';

                new Button({
                    variant: 'ghost',
                    text: 'Ghost',
                    width: '200px'
                }, document.getElementById('ghost-button'));
            </code>
        </pre>`
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

new Tabs({
    items: [
        {
            key: "vanilla",
            label: `<img width="32" src="/img/js.svg"/>`,
            children: `<pre>
                <code>
                    import { Button } from '@brtvcl/arcui';
                    import '@brtvcl/arcui/dist/bundle.css';
    
                    new Button({
                        variant: 'secondary',
                        text: 'Disabled',
                        width: '200px'
                        disabled: true,
                    }, document.getElementById('disabled-button'));
                </code>
            </pre>`
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

new Tabs({
    items: [
        {
            key: "vanilla",
            label: `<img width="32" src="/img/js.svg"/>`,
            children: `<pre>
            <code>
                import { Button } from '@brtvcl/arcui';
                import '@brtvcl/arcui/dist/bundle.css';

                new Button({
                    variant: 'secondary',
                    text: 'Loading',
                    width: '200px'
                    loading: true,
                }, document.getElementById('loading-button'));
            </code>
        </pre>`
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

new Tabs({
    items: [
        {
            key: "vanilla",
            label: `<img width="32" src="/img/js.svg"/>`,
            children: `<pre>
            <code>
                import { Button } from '@brtvcl/arcui';
                import '@brtvcl/arcui/dist/bundle.css';

                new Button({
                    variant: 'secondary',
                    text: 'Small',
                    width: '150px',
                    size: 'small'
                }, document.getElementById('small-button'));
            </code>
        </pre>`
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

new Tabs({
    items: [
        {
            key: "vanilla",
            label: `<img width="32" src="/img/js.svg"/>`,
            children: `<pre>
            <code>
                import { Button } from '@brtvcl/arcui';
                import '@brtvcl/arcui/dist/bundle.css';

                new Button({
                    variant: 'secondary',
                    text: 'Large',
                    width: '150px',
                    size: 'large'
                }, document.getElementById('large-button'));
            </code>
        </pre>`
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

new Tabs({
    items: [
        {
            key: "vanilla",
            label: `<img width="32" src="/img/js.svg"/>`,
            children: `<pre>
            <code>
                import { Button } from '@brtvcl/arcui';
                import '@brtvcl/arcui/dist/bundle.css';

                new Button({
                    variant: 'outline',
                    text: 'Icon',
                    width: '150px',
                    icon: '🚀'
                }, document.getElementById('icon-button'));
            </code>
        </pre>`
        },
    ]
}, document.getElementById("icon-button-code"));

// Square Button
new Button({
    variant: 'outline',
    text: 'Icon',
    width: '150px',
    icon: '🗑️       ',
    square: true,
}, document.getElementById('square-button'));

new Tabs({
    items: [
        {
            key: "vanilla",
            label: `<img width="32" src="/img/js.svg"/>`,
            children: `<pre>
            <code>
                new Button({
                    variant: 'outline',
                    text: 'Icon',
                    width: '150px',
                    icon: '🗑️       ',
                    square: true,
                }, document.getElementById('square-button'));
            </code>
        </pre>`
        },
    ]
}, document.getElementById("square-button-code"));