type CheckboxState = {
	id: string;
	name: string;
	checked: boolean;
	disabled: boolean;
	indeterminate: boolean;
	label: string;
};
import { cleanElement } from "../../utils/cleanElement";

export class Checkbox {
	constructor(props: Partial<CheckboxState>, element:HTMLLabelElement) {
		this.element = element;

		// Render
		this.update(props);
	};
	private element:HTMLLabelElement;
	private eventRegister: any;
	private state: CheckboxState = {
		id: "",
		name: "",
		label: "",
		checked: false,
		disabled: false,
		indeterminate: false
	};
	
	on() {

	};
	off() {

	};
	update(state:Partial<CheckboxState>) {
		
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
	private render(state: CheckboxState) {
		console.log("renderde", state);

		// Clean the element
		this.element = cleanElement(this.element) as HTMLLabelElement;

		// Shorten element reference
		let el = this.element

		// CREATING ELEMENT
		el.classList.add("arc", "arc-check-container");

		let checkEl = document.createElement("span");
		checkEl.classList.add("arc-check");

		let labelEl = document.createElement("span");
		labelEl.classList.add("arc-check-label");
		labelEl.textContent = state.label;

		let inputEl = document.createElement("input");
		inputEl.setAttribute("type", "checkbox");
		inputEl.classList.add("arc-check-input");
		checkEl.append(inputEl);

		let innerEl = document.createElement("span");
		innerEl.classList.add("arc-check-inner");
		checkEl.append(innerEl);

		el.append(checkEl);
		el.append(labelEl);

		// STATES

		// disabled state
		if (state.disabled) {
			el.classList.add("arc-disabled");
			inputEl.disabled = true;
		};

		// checked state
		if (state.checked && !state.indeterminate) {
			inputEl.checked = true;
		};

		// indeterminate state
		if (state.indeterminate) {
			inputEl.indeterminate = true;
		};

		el.addEventListener("click", () => {
			// If not disabled update state
			if (!state.disabled) {
				let updatedState = {...state};
			
				// Toggle checked
				updatedState.checked = !state.checked
				// Make indeterminate false
				updatedState.indeterminate = false;

				// Update state
				this.update(updatedState);
			}
			
		});
	};


}