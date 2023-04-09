import type { CssLength, ArcSize, ArcStatus } from "../../shared/types";

export type ComboBoxState = {
	label: string;
	info: string;
	width: CssLength;
	size: ArcSize;
	status: ArcStatus;
	disabled: boolean;
	dropdownVisible: boolean;
	selected: Array<Option>;
	options: Array<Option>;
	value: string;
	multiple: boolean;
	allowSearch: boolean;
	searchTerm: string;
}


export type Option = {
	label: string;
	value: any;
}