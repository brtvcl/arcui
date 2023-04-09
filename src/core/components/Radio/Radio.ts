type RadioState = {
	id: string;
	name: string;
	checked: boolean;
	disabled: boolean;
	label: string;
}
import { cleanElement } from "../../utils/cleanElement";

export class Radio {
	constructor(props:Partial<RadioState>, element:HTMLLabelElement) {
		this.element = element;
		
		// Render
		this.update(props);
	};
	private element;
	private state:RadioState = {
		id: "",
		name: "",
		checked: false,
		disabled: false,
		label: "string",
	};
	on() {

	};
	off() {

	};
	update(state: Partial<RadioState>) {
		
		// Update state 
		this.state = {
			...this.state,
			...state,
		};

		// Re-render
		this.render(this.state);
	};
	destroy() {

	};
	private render(state: RadioState) {
		// Clean the element
		this.element = cleanElement(this.element) as HTMLLabelElement;

		// Shorten element reference
		let el:HTMLLabelElement = this.element

		// CREATING ELEMENT
		el.classList.add("arc", "arc-radio-container");

		let radioEl = document.createElement("span");
		radioEl.classList.add("arc-radio");

		let labelEl = document.createElement("span");
		labelEl.classList.add("arc-radio-label");
		

		let inputEl = document.createElement("input");
		inputEl.type = "radio";
		inputEl.classList.add("arc-radio-input");
		radioEl.append(inputEl);

		let innerEl = document.createElement("span");
		innerEl.classList.add("arc-radio-inner");
		radioEl.append(innerEl);

		el.append(radioEl, labelEl);

		// STATES

		// disabled state
		if (state.disabled) {
			el.classList.add("arc-disabled");
			inputEl.disabled = true;
		};

		// checked state
		if (state.checked) {
			inputEl.checked = true;
		};

		// label state
		labelEl.textContent = state.label;

		// id state
		inputEl.id = state.id;
		el.setAttribute("for", state.id);
		
	}
};