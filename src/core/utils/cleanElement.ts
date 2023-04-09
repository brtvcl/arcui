export function cleanElement(element: HTMLElement) {
	// Remove all children
	while (element.hasChildNodes()) {
		element.removeChild(element.lastChild as Node);
	};

	// Remove all attribute
	while (element.attributes.length > 0) {
		element.removeAttribute(element.attributes[0].name);
	};

	// Remove all event listeners by cloning it
	let clone = <HTMLElement>element.cloneNode(true);
	element.replaceWith(clone);

	return clone;
};