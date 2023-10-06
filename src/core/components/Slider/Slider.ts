import type { EventRecord } from "../../shared/types";
import type { SliderHandle, SliderState } from "./types";
import { h, render, createElement } from "preact";
import { useEffect, useState, useRef } from "preact/hooks";
import { randomRange } from "../../utils/randomRange";
import { getClosest } from "../../utils/getClosest";

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
		value: 0,
		range: false
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
			const draggingHandle = useRef<SliderHandle>("start"); // We need to know which handle started the dragging we keep this in a mutable ref object 

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
				//Get dimensions of slider
				const container = <HTMLDivElement><unknown>containerRef.current;
				let sliderRect = container.getBoundingClientRect();
				const width = sliderRect.width;
				const left = sliderRect.left;

				// Calculate value in given range of min max
				let clickedValue = Math.min( Math.max(( (mousex - left) / (width - left) ) * (state.max - state.min) + state.min, state.min ), state.max );
				let updatedValue : number | [number, number];

				
				if (state.range && Array.isArray(value)) {
					
					
					setValue((prev) => {
						const updatedValue: [number, number] = [...<[number, number]>prev];
						const handleIndexMap = {
							"start": 0,
							"end": 1
						};
	
						const updadatedHandle = handleIndexMap[draggingHandle.current];

						// Update that is clicked closest to
						updatedValue[updadatedHandle] = clickedValue;

						// If start is larger than end switch moving handle
						if (updatedValue[0] > updatedValue[1]) {
							if (draggingHandle.current == "start") {
								draggingHandle.current = "end";
							} else {
								draggingHandle.current = "start"
							};

							const tmp = updatedValue[0];
							updatedValue[1] = updatedValue[0];
							updatedValue[0] = tmp;
						}
						
						return updatedValue;
					})
					

					// // If start is larger than end switch moving handle
					// if (updatedValue[0] > updatedValue[1]) {
					// 	if (draggingHandle.current == "start") {
					// 		draggingHandle.current = "end";
					// 	} else {
					// 		draggingHandle.current = "start"
					// 	};

					// 	const tmp = updatedValue[0];
					// 	updatedValue[1] = updatedValue[0];
					// 	updatedValue[0] = tmp;
					// }

					// setValue(updatedValue);
				} else {
					updatedValue = clickedValue;
					setValue(updatedValue); //set value
				}
				

				//dispatch change event
				instance.eventRegister.forEach((event) => {
					if (event.type == "change") {
						event.callback(updatedValue);
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

			

			function handleDragStart(e: MouseEvent) {
				if (state.disabled) {
					return;
				}

				let clickedHandle: SliderHandle = "start";

				// If range slider determine which handle should move
				if (Array.isArray(value)) {
					const mousex = e.clientX;
					//Get dimensions of slider
					const container = <HTMLDivElement><unknown>containerRef.current;
					let sliderRect = container.getBoundingClientRect();
					const width = sliderRect.width;
					const left = sliderRect.left;
					let clickedValue = Math.min( Math.max(( (mousex - left) / (width - left) ) * (state.max - state.min) + state.min, state.min ), state.max );
					const {index} = getClosest(value, clickedValue);
					const handles: [SliderHandle, SliderHandle] = ["start", "end"];
					clickedHandle = handles[index];
					draggingHandle.current = clickedHandle;
				} else {
					// If default slider start handle should move
					draggingHandle.current = "start";
				}



				//Move value once for when just clicking and not dragging
				moveValue(e.clientX);
				

				
				//Set dragging true until mouse is up
				setIsDragging(true);
			}

			function passClickedHandle() {}

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

			}, [isDragging, draggingHandle]);


			

			let fillStyle = {};
			let percentage: [number, number] = [0, 0];
			// When slider is normal slider
			if (!state.range && typeof value == "number" ) {
				// Percentage is value adjusted to 0-100 for styling
				percentage[0] = ((value - state.min) * 100) / (state.max - state.min);
				fillStyle = { width: `${percentage[0]}%` };
			} else if (typeof value == "object") {
				const width = value[1] - value[0];
				const left = value[0];

				percentage[0] = left;
				percentage[1] = width + left;
				// When slider is range slider
				fillStyle = { width: `${width}%`, left: `${left}%` };
				// Percentage is value adjusted to 0-100 for styling
			}

			return h("div", { class: containerClassList.join(" "), ref: containerRef }, [
				state.label ? h("label", { class: "arc-slider-label" }, state.label) : null,
				h("div", { class: "arc-slider", onMouseDown:handleDragStart}, [
					h("div", { class: "arc-slider-bar" }, [
						h("div", { class: "arc-slider-fill", style: fillStyle}),
						h("div", { class: "arc-slider-handle arc-slider-handle-start", style:{ left: `${percentage[0]}%`  }}),
						state.range ? h("div", { class: "arc-slider-handle arc-slider-handle-end", style:{ left: `${percentage[1]}%`  }}) : null
					])
				]),
				state.info ? h("div", { class: "arc-info" }, state.info) : null,
				
			]);
		}

		let preactEl = createElement(createComponent, state);

		render(preactEl, this.element);
	}
}
