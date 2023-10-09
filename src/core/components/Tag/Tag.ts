import type { EventRecord } from "../../shared/types";
import type { TagState } from "./types";
import { h, render, createElement } from "preact";

export class Tag {
	constructor(props: Partial<TagState>, element: HTMLDivElement) {
		this.element = element;

		// Render
		this.update(props);
	}
	private element: HTMLDivElement;
	private eventRegister: Array<EventRecord> = [];
	private state: TagState = {
        variant: "primary",
		children: ""
	};


	update(state: Partial<TagState>) {
		// Update state
		this.state = {
			...this.state,
			...state
		};

		// Re-render
		this.render(this.state);
	}
	destroy() {}
	private render(state: TagState) {
		const instance = this;

		function createComponent() {

			const containerClassList:Array<string> = ["arc", "arc-tag"];

			if (state.variant == "primary") {
				containerClassList.push("arc-tag-primary");
			}

			

			return h("div", { class: containerClassList.join(" "), dangerouslySetInnerHTML: { __html: state.children} }, []);
		}

		let preactEl = createElement(createComponent, state);

		render(preactEl, this.element);
	}
}
