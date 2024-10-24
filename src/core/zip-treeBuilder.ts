import type { Heap } from './zip-minHeap';

const treeBuilder = (heap: Heap) => {
    let allNodesParsed = false;

    while (!allNodesParsed) {
        const firstNode = heap.pop();
        const secondNode = heap.pop();

        const firstNodeCount = firstNode?.count || 0;
        const secondNodeCount = secondNode?.count || 0;

        const newNode = {
            count: firstNodeCount + secondNodeCount,
            left: firstNode,
            right: secondNode,
        };

        allNodesParsed = heap.size === 0;

        heap.push(newNode);
    }
};

export { treeBuilder };
