import type { EventRecord } from "../../shared/types";
import type {TreeBranch, OpenBranch, SeedBranch, TreeSelectEvent, TreeSelectState, TreeSelectCallback, TreeSelectEventRecord} from "./types";
import { cleanElement } from "../../utils/cleanElement";

export class TreeSelect {
	constructor(props:Partial<TreeSelectState>, element: HTMLElement) {
		this.element = element;

		// Make seed from tree
		if(props.tree) {
			props.seed = this.makeSeed(props.tree);
		};

		// Make root branches opened by default
		let root:Array<OpenBranch> = [];
		if (props.seed) {
			props.seed.forEach(branch => {
				if (branch.id == branch.parentId) {
					root.push({...branch, expanded: false, depth: 0});
				}
			});
		};
		
		props.openBranches = root;

		// Outside click event listener
		window.addEventListener("click", this.outsideClickHandler, { capture: true });

		// Render
		this.update(props);
	};
	private element:HTMLElement;
	private eventRegister:Array<TreeSelectEventRecord> = [];
	private state:TreeSelectState = {
		tree: [],
		seed: [],
		openBranches: [],
		dropdownVisible: false,
		focused: false,
		selected: null,
		disabled: false,
		status: "default",
		info: "",
		width: "240px",
		size: "medium"
	};

	update(state:Partial<TreeSelectState>) {

		// Update state 
		this.state = {
			...this.state,
			...state,
		};

		// Re-render
		this.render(this.state);
	};
	on(type: TreeSelectEvent, callback: TreeSelectCallback) {
		// Register event with given type and callback
		let id = this.eventRegister.length;
		this.eventRegister.push({id, type, callback});

		// Return id so event listener can be removed 
		return id;
	};
	off(id:number) {
		// Filter the registered event with id
		this.eventRegister = this.eventRegister.filter(event => event.id !== id);
	};
	destroy() {
		// Remove element
		this.element.remove();

		
		window.removeEventListener("click", this.outsideClickHandler);
	};
	private render(state:TreeSelectState) {		
		// Clean the element
		this.element = cleanElement(this.element);

		// Shorten element reference
		let el = this.element

		// Create elements and append according to state
		el.classList.add("arc", "arc-tree-container");

		let mainEl = document.createElement("div");
		mainEl.classList.add("arc-tree");
		
		let bodyEl = document.createElement("div");
		bodyEl.classList.add("arc-tree-body");
		mainEl.append(bodyEl);

		let displayEl = document.createElement("div");
		displayEl.classList.add("arc-tree-display");
		bodyEl.append(displayEl);
		
		let dropdownEl = document.createElement("div");
		dropdownEl.classList.add("arc-tree-dropdown");

		let listEl = document.createElement("ul");

		let infoEl = document.createElement("div");
		infoEl.classList.add("arc-info");

		el.append(mainEl);
		el.append(infoEl);
		// STATES

		// focused & dropdownVisible state
		mainEl.addEventListener("click", () => {
			if (!state.disabled) {
				this.update({
					focused: !state.focused,
					dropdownVisible: !state.dropdownVisible
				});
			}
		}, {capture: true});
		
		// dropdownVisible state
		if (state.dropdownVisible) {
			el.append(dropdownEl);
			dropdownEl.append(listEl);
		};

		
		// info state
		if (state.info) {
			infoEl.textContent = state.info;
		};

		// status state 
		if (state.status == "success") {
			el.classList.add("arc-success");
 		} else if (state.status == "warning") {
			el.classList.add("arc-warning");
		} else if (state.status == "error") {
			el.classList.add("arc-error");
		};

		// selected state
		if (state.selected) {
			displayEl.textContent = state.selected.name;
		};

		// openBranches state
		if (state.openBranches.length) {
			state.openBranches.forEach((branch, index) => {

				// Create branch element
				let branchEl = document.createElement("li");
				branchEl.classList.add("arc-tree-branch");
				branchEl.setAttribute("style", `--level: ${branch.depth*8}px`); 

				// If branch is parent show arrow on the left
				let hasChildren = state.seed.some(b => b.parentId == branch.id && b.id != b.parentId);
				let branchArrowEl = document.createElement("span");
				branchArrowEl.classList.add("arc-tree-arrow");
				let branchNameEl = document.createElement("span"); // Text node for branch name
				branchNameEl.textContent = branch.name;
				if (hasChildren) {
					if (branch.expanded) {
						// Downw arrow
						branchArrowEl.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" width="14" viewBox="0 0 21 24" stroke-width="4" stroke="#ACAFBA"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>`;
					} else {
						// Right arrow
						branchArrowEl.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" width="14" viewBox="0 0 21 24" stroke-width="4" stroke="#ACAFBA"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>`;
					}
				}
				branchEl.append(branchArrowEl);
				branchEl.append(branchNameEl);
				// Add data

				// Add event listeners
				branchEl.addEventListener("click", (ev) => {
					// Get updated branches
					let openBranches = this.branchClickHandler(ev, state, branch, index, (branch: OpenBranch) => {
						// Call the registered events
						this.eventRegister.forEach(event => {
							event.callback(branch);	
						});

						this.update({selected: branch, focused: false, dropdownVisible: false});
					});
					// Update state
					if (openBranches) {
						this.update({openBranches});
					};
				});
				
				// Append to DOM
				listEl.append(branchEl);
			});
		};

		// width state
		if (state.width) {
			el.setAttribute("style", `width: ${state.width}`);
			dropdownEl.setAttribute("style", `width: ${state.width}`);
		};

		// focus state
		if (state.focused) {
			mainEl.classList.add("arc-tree-focus");
		};

		// status state
		if (state.status == "success") {
			el.classList.add("arc-success")
		} else if (state.status == "warning") {
			el.classList.add("arc-warning");
		} else if (state.status == "error") {
			el.classList.add("arc-error");
		}

		// size state
		if (state.size == "large") {
			mainEl.classList.add("arc-tree-large");
		} else if (state.size == "small") {
			mainEl.classList.add("arc-tree-small");
		}

		// disabled state
		if (state.disabled == true) {
			el.classList.add("arc-disabled")
		}


	};
	private outsideClickHandler = (ev:MouseEvent) => {
		// Closure for accessing instance of class with 'this' instead of accessing window object	
		if (this.element && !this.element.contains(ev.target as HTMLElement) && !ev.defaultPrevented) {
			// Clicking outside the element makes element blur
			this.update({
				focused: false,
				dropdownVisible: false
			});
		}
		
	};
	private branchClickHandler(_ev:MouseEvent, state:TreeSelectState, branch:OpenBranch, index:number, callback:Function) {
		// Get children of this branch
		let children = this.getChildren(state.seed, branch);
	
		// If has nothing to collapse or expand, select this branch and dismiss this event
		if (!children.length) {
			// Select this branch
			callback(branch);
			return null;
		};
	
		let openBranches = [...state.openBranches];
	
		// Get this branch from array
		let clickedBranch = openBranches.find(b=> b.id == branch.id) as OpenBranch;
	
		// Update the open branches
		if (!branch.expanded) {
			// Expand the children

			// Insert the children
			children.reverse().forEach(child => {
				let expandBranch = {...child, expanded: false, depth: clickedBranch.depth+1}
				openBranches.splice(index+1, 0, expandBranch);
			});
	
			// Set this branch expanded property to true
			clickedBranch.expanded = true;						
		} else {
			// Recursively collapse children
			let toCollapse = children.length;
			let toRemove:Array<OpenBranch> = [];
			for (let i = index+1; i < index+1+toCollapse; i++) {
				const collapse = openBranches[i];
				toRemove.push(collapse);
				
				// If children expanded collapse also make grandchildren collapse 
				if (collapse.expanded) {
					let collapseChildren = this.getChildren(state.seed, collapse);
					toCollapse += collapseChildren.length;
				};		
	
				// Set descendant branches expanded to false
				collapse.expanded = false;
			};
	
			// Filter the collapsed branches from array
			openBranches = openBranches.filter(branch => !toRemove.find(removeBranch => removeBranch.id == branch.id));
			
			// Set this branch expanded property to false
			clickedBranch.expanded = false;
		};
	
		// Return state
		return openBranches;
	};
	// Returns children array of given parent
	private getChildren(seed:Array<SeedBranch>, parent:SeedBranch) {
		let children:Array<SeedBranch> = [];

		seed.forEach(branch => {
			// Find every children and push it to children array
			if (branch.parentId == parent.id && branch.id != parent.id) {
				children.push(branch)
			}
		});

		return children;
	};
	// Returns seed structure from given tree structure
	private makeSeed(tree:Array<TreeBranch>) {
		function traverseBranch(parentId:number | string, branch:TreeBranch, seed:Array<SeedBranch>) {
			// Create seedling from seed
			let seedling = { id: branch.id, name:branch.name, parentId };
			// Push seedling to seed
			seed.push(seedling)
			// Traverse deeper
			branch.children.forEach(child => {
				traverseBranch(branch.id, child, seed)
			});
		};

	let seed: Array<SeedBranch> = [];
	tree.forEach(branch => {
		// Traverse root
		traverseBranch(branch.id, branch, seed);
	});

	return seed;
	};

};

