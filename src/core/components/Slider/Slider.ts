import type { EventRecord } from "../../shared/types";
import type { SliderState } from "./types";
import { h, render, createElement } from "preact";
import { useEffect, useState, useRef } from "preact/hooks";

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

			const [isDragging, setIsDragging] = useState(false);
			const [value, setValue] = useState(0);

			//Reference to slider container
			const containerRef = useRef(null);

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
				
				//dispatch event
				// props.onChange && props.onChange(percentage);
				
			};

			//Drag end handler function
			function handleDragEnd() {
				setIsDragging(false);
			}

			//Drag move handler function
			function handleDragMove(e: MouseEvent) {
				//If mouse is down move slider
				if (isDragging) {
					console.log(e.clientX);
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
				//Move value once for when just clicking and not dragging
				moveValue(e.clientX);

				//Set dragging true until mouse is up
				setIsDragging(true);
			}

			return h("div", { class: "arc-slider-container", onMouseDown:handleDragStart, ref: containerRef }, [
				h("div", { class: "arc-slider-bar" }, [
					h("div", { class: "arc-slider-fill", style:{ width: `${value}%` }}),
					h("div", { class: "arc-slider-handle", style:{ left: `${value}%`  }}),
				])
			]);
		}

		let preactEl = createElement(createComponent, state);

		render(preactEl, this.element);
	}
}
