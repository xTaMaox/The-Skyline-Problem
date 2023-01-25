function getSkyline(buildings: number[][]): number[][] {
  // occupies space complexity of O(n)
  const maxQueue = new MaxPriorityQueue();
  const positions: number[] = [];
  let result: number[][] = [[-1, 0]];

  buildings.forEach(([l, r, h]) => {
    positions.push(l);
    positions.push(r);
  });

  // occupies space complexity of O(2n)
  positions.sort((a, b) => a - b);
  const addPosition = (p: number, h: number): void => {
    if (result[result.length - 1][1] != h) {
      result.push([p, h]);
    }
  };

  let i = 0;
  // outter loop -> O(2n)
  for (const position of positions) {
    // add building (end-position and hieght) starting from the current position  to queue

    // checks every building once so complexity does affect outter loop time complexity
    while (i < buildings.length && buildings[i][0] <= position) {
      maxQueue.enqueue(buildings[i][1], buildings[i][2]);
      i++;
    }

    // checks every building in heap once so complexity does affect outter loop time complexity

    // cleanup max h with right position before or equal to current position
    while (maxQueue.size() > 0 && maxQueue.front().element <= position) {
      maxQueue.dequeue();
    }

    //add max height to result
    let h = 0;
    if (maxQueue.size() > 0) {
      h = maxQueue.front().priority;
    }
    addPosition(position, h);
  }

  return result.slice(1);
}
