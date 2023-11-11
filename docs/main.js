import { Input } from "@brtvcl/arcui";
import "@brtvcl/arcui/dist/bundle.css";

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