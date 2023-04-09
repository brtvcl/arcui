import type { RefObject } from "preact";
import { useEffect } from "preact/hooks";

export function useOnClickOutside(ref:RefObject<HTMLElement>, handler: Function):Function {
	const listener = (event: MouseEvent | TouchEvent) => {
		// Do nothing if clicking ref's element or descendent elements
		if (!ref.current || ref.current.contains(<HTMLElement>event.target)) {
			return;
		}
		// If clicked call handler
		handler(event);
	};

	const cleaner = () => {
		document.removeEventListener("mousedown", listener);
		document.removeEventListener("touchstart", listener);
	};

	useEffect( () => {
			document.addEventListener("mousedown", listener);
			document.addEventListener("touchstart", listener);
			return cleaner;
		}, [ref, handler]
	);

	return cleaner;
};