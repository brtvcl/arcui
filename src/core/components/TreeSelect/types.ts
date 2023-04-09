import type { CssLength, ArcSize, ArcStatus } from "../../shared/types";

export type SeedBranch = {
	id: number | string;
	name: string;
	parentId: number | string;
}

export type TreeBranch = {
	id: number | string;
	name: string;
	children: Array<TreeBranch>;
}

export interface OpenBranch extends SeedBranch {
	expanded: boolean;
	depth: number;
}

export type TreeSelectState = {
	tree: Array<TreeBranch>;
	seed: Array<SeedBranch>;
	openBranches: Array<OpenBranch>;
	dropdownVisible: boolean;
	focused: boolean;
	selected: OpenBranch | null;
	disabled: boolean;
	status: ArcStatus;
	info: string;
	width: CssLength;
	size: ArcSize;
}

export type TreeSelectEvent = "select"

export type TreeSelectCallback = (detail: OpenBranch) => any;

export type TreeSelectEventRecord = {
	id: number;
	type: string;
	callback: TreeSelectCallback;
}