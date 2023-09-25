import { h, render, createElement } from "preact";
import type { EventRecord } from "../../shared/types";
import type { SliderState } from "./types";

export class Slider {
	constructor(props: Partial<SliderState>, element: HTMLDivElement) {
		this.element = element;

		// Render
		this.update(props);
	}
	private element: HTMLDivElement;
	private eventRegister: Array<EventRecord> = [];
	private state: SliderState = {
		id: "",
		name: "",
		label: "",
		disabled: false,
		info: "",
		max: 100,
		min: 0,
		size: "medium",
		status: "default",
		value: 0
	};

	on() {}
	off() {}
	update(state: Partial<SliderState>) {
		// Update state
		this.state = {
			...this.state,
			...state
		};

		// Re-render
		this.render(this.state);
	}
	destroy() {}
	private render(state: SliderState) {
		const instance = this;

		function createComponent() {
			return h("div", { class: "arc-slider" }, [h("div", { class: "handle" })]);
		}

		let preactEl = createElement(createComponent, state);

		render(preactEl, this.element);
	}
}
