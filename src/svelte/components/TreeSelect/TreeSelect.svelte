<script>
	// IMPORT STATEMENTS
	import { onMount, onDestroy, afterUpdate } from "svelte";
	import { TreeSelect } from "../../../";

	// EXPORT STATEMENTS
	export let state;

	// VARIABLE DEFINITIONS
	let htmlEl = null;
	let component;

	// LIFECYCLE METHODS
	onMount(() => {
		component = new TreeSelect(state, htmlEl);
	});

	onDestroy(() => {
		component.destroy();
	});
</script>
<div bind:this={htmlEl} />