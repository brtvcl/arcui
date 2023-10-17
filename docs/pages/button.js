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
            label: "JS",
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
            label: "React",
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

// Outline Button
new Button({
    variant: 'outline',
    text: 'Outline',
    width: '200px',
}, document.getElementById('outline-button'));

// Ghost Button
new Button({
    variant: 'ghost',
    text: 'Ghost',
    width: '200px',
}, document.getElementById('ghost-button'));

// Disabled Button
new Button({
    variant: 'secondary',
    text: 'Disabled',
    width: '200px',
    disabled: true
}, document.getElementById('disabled-button'));

// Loading Button
new Button({
    variant: 'secondary',
    text: 'Loading',
    width: '200px',
    loading: true,
}, document.getElementById('loading-button'));

// Small Button
new Button({
    variant: 'secondary',
    text: 'Small',
    width: '150px',
    size: 'small'
}, document.getElementById('small-button'));

// Large Button
new Button({
    variant: 'secondary',
    text: 'Large',
    width: '150px',
    size: 'large',
}, document.getElementById('large-button'));

// Icon Button
new Button({
    variant: 'outline',
    text: 'Icon',
    width: '150px',
    icon: '🚀'
}, document.getElementById('icon-button'));

// Square Button
new Button({
    variant: 'outline',
    text: 'Icon',
    width: '150px',
    icon: '🗑️       ',
    square: true,
}, document.getElementById('square-button'));