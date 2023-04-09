import type { ButtonState, ButtonEventRecord } from "./types";
import { cleanElement } from "../../utils/cleanElement";
import { randomRange } from "../../utils/randomRange";

export class Button {
	constructor(props:Partial<ButtonState>, element:HTMLButtonElement) {
		this.element = element;
		
		// Render
		this.update(props);
	};
	private eventRegister:Array<ButtonEventRecord> = [];
	private element: HTMLButtonElement;
	private state:ButtonState = {
		variant: "primary",
		square: false,
		loading: false,
		disabled: false,
		size: "medium",
		width: "auto",
		text: "",
		icon: "",
	};
	on(type: "click", calback: ()=>void):number;
	on(type: string, callback: Function):number {
		// Create random id
		let id = randomRange(1000, 99999999);

		// Register the event
		this.eventRegister.push({ id, type, callback});

		// Return id so it can be removed later
		return id;
	};
	off(id: number) {
		// Filter the registered event with id
		this.eventRegister = this.eventRegister.filter(event => event.id !== id);
	};
	update(state: Partial<ButtonState>) {
		
		// Update state 
		this.state = {
			...this.state,
			...state,
		};

		// Re-render
		this.render(this.state);
	};
	destroy() {
		// Remove element
		this.element.remove();
	};
	private render(state: ButtonState) {
		// Clean the element
		this.element = cleanElement(this.element) as HTMLButtonElement;

		// Shorten element reference
		let el:HTMLButtonElement = this.element;

		// Reference instance with this
		const instance = this;

		// Container element
		el.classList.add("arc", "arc-btn");

		// Icon element
		let iconEl = document.createElement("span");
		iconEl.classList.add("arc-btn-icon");
		
		
		// Icon slot
		let loadingSvg = `<svg width="100%" height="100%" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg"> <defs> <linearGradient id="a" x1="8.042%" x2="65.682%" y2="23.865%"> <stop stop-color="currentColor" stop-opacity="0" offset="0" /> <stop stop-color="currentColor" stop-opacity=".631" offset=".63146" /> <stop stop-color="currentColor" offset="1" /> </linearGradient> </defs> <g fill="none" fill-rule="evenodd"> <g transform="translate(1 1)"> <path d="m36 18c0-9.94-8.06-18-18-18" stroke="currentColor" stroke-width="2"> <animateTransform attributeName="transform" dur="0.9s" from="0 18 18" repeatCount="indefinite" to="360 18 18" type="rotate" /> </path> <circle cx="36" cy="18" r="1" fill="currentColor"> <animateTransform attributeName="transform" dur="0.9s" from="0 18 18" repeatCount="indefinite" to="360 18 18" type="rotate" /> </circle> </g> </g> </svg>`;

		if (state.loading) {
			iconEl.innerHTML = loadingSvg;
			el.appendChild(iconEl);
		} else if (state.icon) {
			iconEl.innerHTML = state.icon;
			el.appendChild(iconEl);
		};

		// Body element
		let bodyEl = document.createElement("span");
		bodyEl.classList.add("arc-btn-body");
		el.appendChild(bodyEl);


		// STATES

		// disabled
		if (state.disabled) {
			el.classList.add("arc-disabled");
		};

		// width state
		if (!state.square) {
			el.setAttribute("style", `width: ${state.width}`);
		}

		// size state
		el.classList.add(`arc-${state.size}`);


		// square state
		if (state.square) {
			el.classList.add("arc-btn-square");
		};

		// variant state
		el.classList.add(`arc-btn-${state.variant}`);

		// text state
		if (!state.square) {
			bodyEl.textContent = state.text;
		}

		// EVENT LISTENERS
		el.addEventListener("click", () => {
			// Call the registered events with type click
			instance.eventRegister.forEach(event => {
				if (event.type == "click") {
					event.callback();	
				};
			});
		});
		
	}
};