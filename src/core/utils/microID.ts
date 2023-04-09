import { randomRange } from "./randomRange";
function microID(length:number = 8):string {
	const charset = "ABCDEFGHJKLMNOPRSTYUWXQZ0123456789";
	let id = "";
	for (let i = 0; i < length; i++) {
		id += charset[randomRange(0, charset.length-1)];
	}

	return id;
};

export { microID };