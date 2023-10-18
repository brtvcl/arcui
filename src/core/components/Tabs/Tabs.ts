import type { TabKey, TabsState } from "./types";
import type { EventRecord } from "../../shared/types";
import { h, render, createElement } from "preact";
import { useState }from "preact/hooks";

export class Tabs {
    constructor(props: Partial<TabsState>, element: HTMLDivElement) {
        this.element = element;

		// If default active key is not set, set it to first tab
		if (!props.defaultActiveKey && Array.isArray(props.items) && props.items.length > 0) {
			props = {...props, defaultActiveKey: props.items[0].key}
		}

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
			const [activeKey, setActiveKey] = useState(state.defaultActiveKey);
			const containerClassList:Array<string> = ["arc", "arc-tabs-container"];

			const activePanel = state.items.find((item) => item.key == activeKey) || { children: "" };

			function handleActiveKey(key: TabKey) {
				setActiveKey(key);
			}

			
			return h("div", { class: containerClassList.join(" ") }, [
				h("div", { class: "arc-tabs-nav" }, [
					...state.items.map((item) => {
						const itemClassList:Array<string> = ["arc-tab"];
						if (item.key == activeKey) {
							itemClassList.push("arc-tab-active");
						}

						return h("div", { class: itemClassList.join(" "), key: item.key, onClick: ()=>{handleActiveKey(item.key)} }, [
							h("div", { class: "arc-tab-label", dangerouslySetInnerHTML: {__html: item.label} }),
						]);
					})
				]),
				h("div", { class: "arc-tab-panel", dangerouslySetInnerHTML: {__html: activePanel.children} })
				
			]);
		}

		let preactEl = createElement(createComponent, state);

		render(preactEl, this.element);
	}
}