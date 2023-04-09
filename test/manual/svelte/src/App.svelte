<script>
	import { TreeSelect } from "../../../../dist/svelte";
	import "../../../../dist/bundle.css";

	let state = {
		tree: [
			{
				id: 0,
				name: "A",
				children: [
					{
						id: 5,
						name: "A.1",
						children: [{ id: 8, name: "A.1.1", children: [] }],
					},
					{
						id: 6,
						name: "A.2",
						children: [],
					},
					{
						id: 7,
						name: "A.3",
						children: [],
					},
				],
			},
			{ id: 1, name: "B", children: [] },
			{ id: 2, name: "C", children: [] },
			{ id: 3, name: "Dx", children: [] },
		],
		info: "Error",
		status: "default"
	};
</script>

<main>
	<TreeSelect state={state}/>
</main>
