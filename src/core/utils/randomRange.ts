/**
 * Returns a random integer between min and max
 * @param min Minimum value that can be returned (inclusive)
 * @param max Maximum value that can be returned (inclusive) 
 * @returns Random integer between min and max
 */
export function randomRange(min: number, max: number):number {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};