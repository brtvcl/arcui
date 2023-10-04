import { ArcSize, ArcStatus } from "../../shared/types";

export type SliderState = {
	id: string;
	name: string;
	disabled: boolean;
	value: number | [number, number];
	min: number;
	max: number;
	label: string;
	info: string;
	status: ArcStatus;
	size: ArcSize;
	range: boolean;
};

export type SliderEventRecord = {
	id: number;
	type: string;
	callback: Function;
};
