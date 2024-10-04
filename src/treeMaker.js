import { errorLib } from './errorLibrary';
import { Heap } from './minHeap';

const treeMaker = (heap) => {
    if (!heap) {
        errorLib.parameterIsMissing();
    }
    if (!(heap instanceof Heap)) {
        errorLib.dataExpected('Heap', heap);
    }

    let allNodesParsed = false;

    while (!allNodesParsed) {
        const firstNode = heap.pop();
        const secondNode = heap.pop();

        const secondNodeCount = secondNode?.count || 0;

        const newNode = {
            count: firstNode.count + secondNodeCount,
            left: firstNode,
            righ: secondNode,
        };

        allNodesParsed = heap.size === 0;

        heap.push(newNode);
    }
};

export { treeMaker };
