import type { ArcSize, CssLength } from "../../shared/types";

export type ButtonState = {
	variant: "primary" | "secondary" | "outline" | "ghost";
	square: boolean;
	loading: boolean;
	disabled: boolean;
	size: ArcSize;
	width: CssLength;
	text: string;
	icon: string;
};

export type ButtonEventRecord = {
	id: number;
	type: string;
	callback: Function;
};