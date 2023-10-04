function getClosest(numbers: Array<number>, goal:number) {
    let minDiff = Infinity;
    let minDiffIndex = -1;
    for (let i = 0; i < numbers.length; i++) {
        const num = numbers[i];
        const diff = Math.abs(num - goal);
        if (diff < minDiff) {
          minDiff = diff;
          minDiffIndex = i;
        }
    }
  
    return {
      index: minDiffIndex,
      value: numbers[minDiffIndex]
    };
} 


export { getClosest };