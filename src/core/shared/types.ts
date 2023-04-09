export type EventRecord = {
	id: number;
	type: string;
	callback: Function;
};

export type ArcStatus = "default" | "success" | "warning" | "error";

export type ArcSize =  "small" | "medium" | "large";

export type CssLength = `${number}${"cm" | "mm" | "in" | "px" | "pt" | "pc" | "em" | "ex" | "ch" | "rem" | "vw" | "vh" | "vmin" | "vmax" | "%"}` | "auto";