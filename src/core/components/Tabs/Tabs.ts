import type { TabsState } from "./types";
import type { EventRecord } from "../../shared/types";
import { h, render, createElement } from "preact";

export default class Tabs {
    constructor(props: Partial<TabsState>, element: HTMLDivElement) {
        this.element = element;

		// Render
		this.update(props);
    }

    private element: HTMLDivElement;
    private eventRegister: Array<EventRecord> = [];
	private state: TabsState = {
        defaultActiveKey: 0,
        items: []
	};

    update(state: Partial<TabsState>) {
		// Update state
		this.state = {
			...this.state,
			...state
		};

		// Re-render
		this.render(this.state);
	}

    destroy() {}

    private render(state: TabsState) {
		const instance = this;

		function createComponent() {

			const containerClassList:Array<string> = ["arc", "arc-tabs"];

			
			return h("div", { class: containerClassList.join(" ") }, []);
		}

		let preactEl = createElement(createComponent, state);

		render(preactEl, this.element);
	}
}