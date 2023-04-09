import type { ArcSize, CssLength, ArcStatus } from "../../shared/types";

export type SelectState = {
	label: string;
	info: string;
	width: CssLength;
	size: ArcSize;
	status: ArcStatus;
	disabled: boolean;
	dropdownVisible: boolean;
	selected: Option | null;
	options: Array<Option>;
	allowSearch: boolean;
	searchTerm: string;
};

export type Option = {
	label: string;
	value: any;
};

export type InternalOption = {
	id: string;
	label: string;
	value: any;
}