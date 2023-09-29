import type { EventRecord } from "../../shared/types";
import type { SliderState } from "./types";
import { h, render, createElement } from "preact";
import { useEffect, useState, useRef } from "preact/hooks";
import { randomRange } from "../../utils/randomRange";

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

	on(type: "change", calback: (value: number)=>void):number;
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

			const [isDragging, setIsDragging] = useState(false);
			const [value, setValue] = useState(state.value);

			//Reference to slider container
			const containerRef = useRef(null);

			// Container classes
			const containerClassList:Array<string> = [];
			containerClassList.push("arc", "arc-slider-container");
			
			// Set active
			if (isDragging) {
				containerClassList.push("arc-slider-active");
			}

			// Set disabled
			if (state.disabled) {
				containerClassList.push("arc-disabled");
			}

			// Set status
			if (state.status == "success") {
				containerClassList.push("arc-success")
			} else if (state.status == "warning") {
				containerClassList.push("arc-warning");
			} else if (state.status == "error") {
				containerClassList.push("arc-error");
			};

			//Function to move value and calculcate percentage based on mouse position
			function moveValue(mousex: number) {
				const container = <HTMLDivElement><unknown>containerRef.current;

				//Get dimensions of slider
				let sliderRect = container.getBoundingClientRect();
				const width = sliderRect.width;
				const left = sliderRect.left;
				
				let x = mousex - left; //x p osition within the container.
				let percentage = x*100/width; //0-100 value of slider
				percentage = Math.min(Math.max(percentage, 0), 100); //Clamp percentage between 0-100
				setValue(percentage); //set value
				
				//dispatch change event
				instance.eventRegister.forEach((event) => {
					if (event.type == "change") {
						event.callback(percentage);
					}
				});
				
			};

			//Drag end handler function
			function handleDragEnd() {
				setIsDragging(false);
			}

			//Drag move handler function
			function handleDragMove(e: MouseEvent) {
				//If mouse is down move slider
				if (isDragging) {
					e.preventDefault();
					moveValue(e.clientX);
				}
			};

			useEffect(() => {

				//End dragging when mouse is up
				window.addEventListener("mouseup", handleDragEnd);

				//Drag slider when mouse is down
				window.addEventListener("mousemove", handleDragMove);

				return () => {
					//Cleanup global event listeners on component unmount
					window.removeEventListener("mouseup", handleDragEnd);
					window.removeEventListener("mousemove", handleDragMove);
				}

			}, [isDragging])

			function handleDragStart(e: MouseEvent) {
				if (state.disabled) {
					return;
				}

				//Move value once for when just clicking and not dragging
				moveValue(e.clientX);

				//Set dragging true until mouse is up
				setIsDragging(true);
			}



			return h("div", { class: containerClassList.join(" "), ref: containerRef }, [
				state.label ? h("label", { class: "arc-slider-label" }, state.label) : null,
				h("div", { class: "arc-slider", onMouseDown:handleDragStart}, [
					h("div", { class: "arc-slider-bar" }, [
						h("div", { class: "arc-slider-fill", style:{ width: `${value}%` }}),
						h("div", { class: "arc-slider-handle", style:{ left: `${value}%`  }}),
					])
				]),
				state.info ? h("div", { class: "arc-info" }, state.info) : null,
				
			]);
		}

		let preactEl = createElement(createComponent, state);

		render(preactEl, this.element);
	}
}
