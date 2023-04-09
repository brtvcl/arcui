	import type { InputState, InputEventRecord } from "./types";
	import type { Ref, RefObject } from "preact";
	import type { MutableRef } from "preact/hooks";
	import { h, render, createElement } from "preact";
	import { useState, useRef } from "preact/hooks";
	import { randomRange } from "../../utils/randomRange";
	import { cleanElement } from "../../utils/cleanElement";

	export class Input {
		constructor(props: Partial<InputState>, element: HTMLDivElement) {
			this.element = element;

			// Render
			this.update(props);
		};
		private eventRegister:Array<InputEventRecord> = [];
		private element: HTMLDivElement;
		private state: InputState = {
			id: "",
			name: "",
			type: "text",
			value: "",
			disabled: false,
			label: "",
			info: "",
			icon: null,
			status: "default",
			size: "medium",
			allowClear: false,
			allowReveal: false,
			isRevealed: false,
			width: "240px",
			focused: false,
		};

		on(type: "input", calback: (value: string)=>void):number;
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
		update(state: Partial<InputState>) {

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
		private render(state: InputState) {

			// Clean the element
			this.element = cleanElement(this.element) as HTMLDivElement;

			// Shorten element reference
			let el = this.element

			// Reference instance with this
			const instance = this;

			// CREATING PREACT COMPONENT
			let createComponent = () =>  {

				// States for preact to handle
				const [value, setValue] = useState(state.value);
				const [type, setType] = useState(state.isRevealed ? "text" : state.type);

				const inputRef:MutableRef<HTMLInputElement | undefined>  = useRef();

				function inputHandler(e: Event) {
					const target = e.currentTarget as HTMLInputElement;
					// Handle new value
					valueHandler(target.value);
				};

				function valueHandler(newValue: string) {
					// Update state
					setValue(newValue);
					// Call the registered events
					instance.eventRegister.forEach(event => {
						if (event.type == "input") {
							event.callback(newValue);	
						};
					});
				};

				function clearHandler(e:Event) {
					setValue("");
					if (state.type == "password") {
						setType("password");
					}
				};

				function revealHandler(e:Event) {
					e.stopPropagation();
					if (type == "password") {
						setType("text");
					} else {
						setType("password")
					};
				};

				function bodyClickHandler() {
					inputRef.current?.focus();
				};

				let clearButtonSvg = { __html: `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>` };
				let revealButtonSvg = { __html: `<svg width="100%" height="100%"  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" /></svg>` };
				let hideButtonSvg = { __html: `<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>` };

				let containerClassList: string[] = [];

				containerClassList.push("arc", "arc-input-container");

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


				// Return vnode
				return h("div", { class: containerClassList.join(" "), style: { width: state.width } }, [
					state.label ? h("label", { class: "arc-input-label", for: state.id || undefined }, state.label) : null,
					h("div", { class: "arc-input", onClick: bodyClickHandler }, [
						state.icon ? h("span", { class: "arc-input-icon", dangerouslySetInnerHTML: { __html: state.icon } }, []) : null,
						h("input", { ref: <RefObject<HTMLInputElement>>inputRef, autoFocus: state.focused, disabled: state.disabled, type: type, id: state.id, name: state.name, value: value, class: "arc-input-control", onInput: inputHandler }, []),
						state.type == "password" && state.allowReveal && value ? h("span", { onClick: revealHandler, class: "arc-input-reveal-toggle", dangerouslySetInnerHTML: type == "password" ? revealButtonSvg : hideButtonSvg }, []) : null,
						value && state.allowClear ? h("span", { onClick: clearHandler, class: "arc-input-clear-button", dangerouslySetInnerHTML: clearButtonSvg }, []) : null,
					]),
					state.info ? h("div", { class: "arc-info" }, state.info) : null
				]);
			};

			let preactEl = createElement(createComponent, state);

			render(preactEl, el);
		};


	}