const techList = document.getElementById("tech-selector");
const techListChildren = [...techList.children];
techListChildren.forEach((child) => {
	child.addEventListener('click', () => {
		techListChildren.forEach((child) => {child.classList.remove('active')});

		child.classList.add('active');
	});
})