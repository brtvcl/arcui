import { Input, Button } from "@brtvcl/arcui";
import "@brtvcl/arcui/dist/bundle.css";
import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-jsx";
import "prismjs/themes/prism.min.css";

// Search bar
new Input({
    size: "small",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ACAFBA" class="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
  </svg>
  `,
  width: "180px",
}, document.getElementById("searchbar"));


// Toggle navbar Menu
const toggleMenuButton = document.getElementById("toggle-menu");
const navbar = document.querySelector(".navbar");
toggleMenuButton.addEventListener("click", () => {
    navbar.classList.toggle("expanded");
});

// Hide navbar on screen size change
window.addEventListener("resize", () => {
    navbar.classList.remove("expanded");
})

// Framework selector
const frameworks = document.querySelectorAll(".framework");
const frameworksContainer = document.querySelector('.frameworks-container');
const heroTitle = document.querySelector(".hero h1");

const frameworksColors = {
    js: {
        from: "#f0db4f",
        to: "#ff8702",
        glow: "#f0db4f10"
    },
    react: {
        from: "#443af9",
        to: "#61dbfb",
        glow: "#443af920",
    },
    angular: {
        from: "#db1b16",
        to: "#410a0a",
        glow: "#db1b1615",
    },
    vue: {
        from: "#41b883",
        to: "#216b8a",
        glow: "#41b88320",
    },
    svelte: {
        from: "#ff3e00",
        to: "#ffc686",
        glow: "#ff3e0015",
    },
}

let activeFramework = "js";
const heroGlowElement = document.querySelector(".glow");
frameworks.forEach((framework) => {
    framework.addEventListener("mouseenter", (e) => {
        const tech = framework.dataset.fw;
        activeFramework = tech;
        frameworks.forEach((framework) => framework.classList.remove("active"))
        framework.classList.add("active");

        frameworksContainer.dataset.activeFw = tech;
        heroGlowElement.style = `--hero-glow-color: ${frameworksColors[tech].glow};`;
        console.log(heroGlowElement);
        heroTitle.style = `--hero-from-color: ${frameworksColors[tech].from}; --hero-to-color: ${frameworksColors[tech].to}`;
    })
})

// Add Snippet Copy Button to all snippets
function highlightJsCode(code, language) {
    return `<pre><code>${Prism.highlight(code, Prism.languages[language], language)}</code></pre>`;
}

const frameworkConfig = {
    js: {
        grammar: "js"
    },
    react: {
        grammar: "jsx"
    },

};

Object.entries(frameworkConfig).forEach(([framework, config]) => {
    const jsCode = document.querySelector(`.framework-content[data-fw="${framework}"] .snippet`);
    jsCode.innerHTML = highlightJsCode(`// ${framework} Code here`, config.grammar);
});
