import type { ComboBoxState, Option } from "./types";
import type { EventRecord } from "../../shared/types";
import type { Ref, RefObject } from "preact";

import { randomRange } from "../../utils/randomRange";
import { h, render, createElement, createRef } from "preact";
import { useState, useRef, useEffect, useCallback } from "preact/hooks";
import { useOnClickOutside } from "../../utils/useOnClickOutside";


export class ComboBox {
	constructor(props:Partial<ComboBoxState>, element:HTMLDivElement) {
		this.element = element;
		
		// Render
		this.update(props);
	};
	private eventRegister:Array<EventRecord> = [];
	private element: HTMLDivElement;
	private state:ComboBoxState = {
		label: "",
		info: "",
		width: "240px",
		size: "medium",
		status: "default",
		disabled: false,
		dropdownVisible: false,
		selected: [],
		options: [],
		value: "",
		multiple: false,
		allowSearch: false,
		searchTerm: ""
	};
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
	update(state: Partial<ComboBoxState>) {
		
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
	private render(state: ComboBoxState) {
		
		// CREATING PREACT COMPONENT(s)
		
		let xMarkSvg = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>`;


		/**
		 * Preact component for rendering selected values as a tag with button or just string
		 * @param state ComboBox state
		 * @returns Array of preact vnodes
		 */
		function selectedComponent(multiple: boolean, selected: Array<Option>, removeHandler: (removed: Option)=>void) {
			
			// Return tag component if multiple selection is allowed
			// if not return just string component 
			if (multiple) {
				return selected.map(s => {
					return h("span", { class: "arc-combobox-tag"}, [
						h("span", { class: "arc-combobox-tag-label", dangerouslySetInnerHTML: {__html: s.label}}, null),
						h("span", { class: "arc-combobox-tag-button", dangerouslySetInnerHTML: {__html: xMarkSvg}, onClick: ()=>removeHandler(s)}, null)
					])
				});			
			} else {
				return selected.map(s => {
					return h("span", { class: "arc-combobox-value", dangerouslySetInnerHTML: {__html: s.label}}, null)
				});	
			}
			
		}

		/**
		 * Creates the main component
		 * @returns Main component as preact vnode
		 */
		function createComponent() {

			// Make arc state a preact state
			const [dropdownVisible, setDropdownVisible] = useState(state.dropdownVisible); 
			const [selected, setSelected] = useState(state.selected);
			const [searchTerm, setSearchTerm] = useState(state.searchTerm);
			const [options, setOptions] = useState([...state.options]);
			const [searchInputNode, setSearchInputNode] = useState<HTMLInputElement | null>(null);

			// Create ref for outside click handle
			const container:RefObject<HTMLDivElement> = createRef();

			// When the search input is rendered give focus to it 
			const searchInputRef = useCallback((node: HTMLInputElement) => {
				if (node !== null) {
					// Store node object in state for focusing manually later on
					setSearchInputNode(node); 
					node.focus();
				}
			  }, []);

			// Container classes
			let containerClassList = ["arc", "arc-combobox-container"];

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
			useOnClickOutside(container, () => {
				if (dropdownVisible) {
					setDropdownVisible(false);
				}
			});

			// Container click handler makes dropdown invisible
			function containerClickHandler() {
				if (!dropdownVisible) {
					setDropdownVisible(true);
					return;
				}
			};

			// Option click handler
			function optionClickHandler(option: Option) {
				// Empty the searchTerm
				searchHandler("");

				if (state.multiple) {
					// Select multiple options
					// If clicked option not inserted in selected array, insert it
					if (!optionSelected(option)) {
						setSelected(prevSelected => [...prevSelected, option]);
					};

					// If search input is rendered - focus on it
					if (searchInputNode !== null) {
						searchInputNode.focus();
					}
				} else {
					// Select single option
					setSelected([option]);
					// Hide dropdown
					setDropdownVisible(false);
				};
				
			};

			// Selected click handler
			function selectedRemoveClickHandler(removed: Option) {
				// Remove the clicked option from selected
				setSelected(prevSelected => prevSelected.filter(s => JSON.stringify(s.value) != JSON.stringify(removed.value)));

				// If search input is rendered - focus on it
				if (searchInputNode !== null) {
					searchInputNode.focus();
				}
			};

			// Search input handler
			function searchHandler(searchTerm: string) {
				// Set search term
				setSearchTerm(searchTerm);

				// If search term not empty make search
				// If empty display all options
				if (searchTerm) {	
					// Filter the options
					let filteredOptions = state.options.filter(o => {
						const optionStringified = `${JSON.stringify(o.value)} ${JSON.stringify(o.label)}`;


						if (optionStringified.toLowerCase().includes(searchTerm.toLowerCase())) {
							return true
						};

						return false;
						
					});
					// Set filterd options
					setOptions(filteredOptions);
				} else {
					// Set all options
					setOptions(state.options);
				}
			};

			function optionHtmlBuild(option: Option) {
				// If this option is not selected return plain label
				if (!optionSelected(option)) {
					return option.label;
				} else {
					// If this option is selected return label with checkmark
					return `<span class="arc-combobox-option-items">
						<span>${option.label}</span>
						<span class="arc-combobox-check">
							<svg class="arc-combobox-check-svg" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
					  	</span>
					</span>`
				}
			};

			// Function for checking if option is selected or not
			function optionSelected(option: Option) {
				// This is option is not among the selected ones
				if (!selected.some(s => JSON.stringify(s.value) === JSON.stringify(option.value))) {
					return false;
				}
				
				// This option IS among the selected ones
				return true;
			}

			// Return vnode
			return (
				h("div", { onClick: containerClickHandler, ref: container, class: containerClassList.join(" "), style: `width: ${state.width}` }, [
					state.label ? h("div", { class: "arc-combobox-label" }, state.label) : null,
					h("div", { class: `arc-combobox ${dropdownVisible ? "arc-combobox-focus" : ""}` }, [
						state.multiple ? 
							[
								...selectedComponent(state.multiple, selected, selectedRemoveClickHandler),
								state.allowSearch ? 
									h("input", { 
										class: "arc-combobox-search", 
										ref: <Ref<HTMLInputElement>>searchInputRef,
										type: "text", 
										onInput: (e: Event)=>searchHandler((e.target as HTMLInputElement).value), 
										value: searchTerm 
									}, null) : 
									null
							] :
							state.allowSearch && dropdownVisible ? 
								h("input", { 
									class: "arc-combobox-search", 
									ref: <Ref<HTMLInputElement>>searchInputRef,
									type: "text", 
									onInput: (e: Event)=>searchHandler((e.target as HTMLInputElement).value), 
									placeholder: selected.at(0)?.label, 
									value: searchTerm 
								}, null) : 
								h("span", { 
									class: "arc-select-value"
								}, selected.at(0)?.label)
							
					]),
					state.info ? h("div", { class: "arc-info" }, state.info) : null,
					dropdownVisible ? h("div", { class: "arc-combobox-dropdown", style: `width: ${state.width}`}, [
						h("ul", null, options.length ? options.map(o => {
							return h("li", { 
								onClick: ()=>optionClickHandler(o), 
								class: `arc-combobox-option ${optionSelected(o)?"selected":""}`, 
								dangerouslySetInnerHTML: { 
									__html: optionHtmlBuild(o) 
								}})
						}): h("li", { class: "arc-combobox-no-option"}, "No data"))
					]) : null
				])
			);
		};

		let preactEl = createElement(createComponent, state);

		render(preactEl, this.element);
	}
};