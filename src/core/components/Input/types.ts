import type { ArcSize, ArcStatus, CssLength } from "../../shared/types";

export type InputState = {
	id: string;
	name: string;
	type: "text" | "password";
	value: string;
	disabled: boolean;
	label: string;
	info: string;
	icon: string | null ;
	status: ArcStatus;
	size: ArcSize;
	allowClear: boolean;
	allowReveal: boolean;
	isRevealed: boolean;
	width: CssLength;
	focused: boolean;
};

export type InputEventRecord = {
	id: number;
	type: string;
	callback: Function;
}