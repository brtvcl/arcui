import type { SelectState, Option, InternalOption } from "./types";
import type { EventRecord } from "../../shared/types";
import type { Ref, RefObject } from "preact";
import { randomRange } from "../../utils/randomRange";
import { h, render, createElement, createRef } from "preact";
import { useState, useRef, useEffect, useCallback } from "preact/hooks";
import { useOnClickOutside } from "../../utils/useOnClickOutside";
import { microID } from "../../utils/microID";

/*

HTML MARKUP FOR COMPONENT

<div class="arc arc-select-container">
	<div class="arc-select-label"></div>
	<div class="arc-select">
		<input class="arc-select-search" type="text"/>
		||
		<span class="arc-select-value"> VALUE </span>
	</div>
	<div class="arc-info"></div>
	<div class="arc-select-dropdown"></div>
</div>
*/

export class Select {
	constructor(props:Partial<SelectState>, element:HTMLDivElement) {
		this.element = element;
		
		// Render
		this.update(props);
	};
	private eventRegister:Array<EventRecord> = [];
	private element: HTMLDivElement;
	private state:SelectState = {
		label: "",
		info: "",
		width: "240px",
		size: "medium",
		status: "default",
		disabled: false,
		dropdownVisible: false,
		selected: null,
		options: [],
		allowSearch: false,
		searchTerm: ""
	};
	private cleanUpFunctions:Array<{ key: string, function: Function}> = [];
	on(type: "select", calback: (option: Option)=>void):number;
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
	update(state: Partial<SelectState>) {
		
		// Update state 
		this.state = {
			...this.state,
			...state,
		};

		// Re-render
		this.render(this.state);
	};
	destroy() {
		// Call cleanup functions
		this.cleanUpFunctions.forEach(f => f.function());

		// Remove element
		this.element.remove();
	};
	private render(state: SelectState) {
		
		// CREATING PREACT COMPONENT(s)
		
		let xMarkSvg = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>`;
		
		// Reference instance with this
		const instance = this;

		// JSON Stringified options for search feature
		const searchOptions = state.options.map(o => {
			return `${JSON.stringify(o.value)} ${JSON.stringify(o.label)}`.toLowerCase();
		});

		/**
		 * Creates the main component
		 * @returns Main component as preact vnode
		 */
		function createComponent() {

			// Make arc state a preact state
			const [dropdownVisible, setDropdownVisible] = useState(state.dropdownVisible); 
			const [selected, setSelected] = useState<Option | null>(state.selected);
			const [options, setOptions] = useState<Option[]>(state.options);

			// Create ref for outside click handle
			const container:RefObject<HTMLDivElement> = createRef();

			// When the search input is rendered give focus to it 
			const searchInputRef = useCallback((node: HTMLInputElement) => {
				if (node !== null) { 
					node.focus();
				}
			  }, []);


			// Container classes
			let containerClassList = ["arc", "arc-select-container"];

			// Set disabled
			if (state.disabled) {
				containerClassList.push("arc-disabled");
			};

			// Set status
			if (state.status == "success") {
				containerClassList.push("arc-success")
			} else if (state.status == "warning") {
				containerClassList.push("arc-warning");
			} else if (state.status == "error") {
				containerClassList.push("arc-error");
			};

			// Set size
			if (state.size == "large") {
				containerClassList.push("arc-large");
			} else if (state.size == "small") {
				containerClassList.push("arc-small");
			};

			// Outside Click handler
			const removeClickHandler = useOnClickOutside(container, () => {
				if (dropdownVisible) {
					setDropdownVisible(false);
				}
			});

			// Find cleanup function
			let cleanUpFunctionRecord = instance.cleanUpFunctions.find(c => c.key == "outsideClick");

			if (cleanUpFunctionRecord) {
				// If cleanup function exists - update it
				cleanUpFunctionRecord.function = removeClickHandler;	
			} else {
				// If not exists - create it
				instance.cleanUpFunctions.push({key: "outsideClick", function: removeClickHandler});
			}


			// Container click handler makes dropdown invisible
			function containerClickHandler() {
				// If disabled - dont function
				if (state.disabled) {
					return;
				}

				if (!dropdownVisible) {
					setDropdownVisible(true);
					return;
				}
			};

			// Option Click handler
			function optionClickHandler(option: Option) {

				setSelected({label: option.label, value: option.value});
				setDropdownVisible(false);

				// Call the registered events with type select and pass option
				instance.eventRegister.forEach(event => {
					if (event.type == "select") {
						event.callback(option);	
					};
				});

				// Reset searched option
				setOptions(state.options)
			};

			// Search handler
			function searchHandler(searchTerm: string) {
				if (searchTerm) {					
					// Filter the options
					let searchTermLowerCase = searchTerm.toLowerCase();
					let filteredOptions = state.options.filter((o, i) => searchOptions[i].includes(searchTermLowerCase));

					// Set filterd options
					setOptions(filteredOptions);
				} else {
					// Set all options
					setOptions(state.options);
				}
			}

			// Return vnode
			return (
				h("div", { onClick: containerClickHandler, ref: container, class: containerClassList.join(" "), style: `width: ${state.width}` }, [
					state.label ? h("label", { class: "arc-select-label" }, state.label) : null,
					h("div", { class: `arc-select ${dropdownVisible ? "arc-select-focus" : ""}` }, [
						state.allowSearch && dropdownVisible ? 
							h("input", { ref:<Ref<HTMLInputElement>>searchInputRef, onInput: (e)=>searchHandler((<HTMLInputElement>e.target).value), class: "arc-select-search",placeholder: selected?.label, type: "text"}, null) :
							h("span", { class: "arc-select-value"}, selected?.label)
					]),
					dropdownVisible ? h("div", { class: "arc-select-dropdown", style: `width: ${state.width}`}, [
						h("ul", null, options.length ? 
							options.map(o => h("li", { onClick: ()=>optionClickHandler(o),class: `arc-select-option`}, o.label)): 
							h("li", { class: "arc-select-no-option"}, "No data") )
					]) : null,
					state.info ? h("div", { class: "arc-info" }, state.info) : null,
					
				])
			);
		};

		let preactEl = createElement(createComponent, state);

		render(preactEl, this.element);
	}
};