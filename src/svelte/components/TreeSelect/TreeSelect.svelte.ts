import { SvelteComponentTyped } from "svelte";
import { CssLength } from "../../../core/shared/types";
import { TreeBranch, SeedBranch, OpenBranch,  } from "../../../core/components/TreeSelect/types";
declare type EventDetail<T> = {
	id: number;
	value: string;
	detail: Array<T>
}
declare const __propDef: {
	props: {
		tree?: Array<TreeBranch>;
		seed?: Array<SeedBranch>;
		openBranches?: Array<OpenBranch>;
		dropdownVisible?: boolean;
		focused?: boolean;
		selected?: OpenBranch;
		disabled?: boolean;
		status?: "default" | "success" | "warning" | "error";
		info?: string;
		width?: CssLength;
		size?: "small" | "medium" | "large";
	};
	events: {
		select: CustomEvent<EventDetail<OpenBranch>>;
	};
	slots: {
		default: {};
	};
};
export declare type TreeSelectProps = typeof __propDef.props;
export declare type TreeSelectEvents = typeof __propDef.events;
export declare type TreeSelectSlots = typeof __propDef.slots;
export default class TreeSelect extends SvelteComponentTyped<TreeSelectProps, TreeSelectEvents, TreeSelectSlots> {

}