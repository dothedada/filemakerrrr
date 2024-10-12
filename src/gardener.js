import { Heap } from './minHeap.js';
import { treeMaker } from './treeMaker.js';

const gardener = (charsMap) =>
    new Promise((resolve) => {
        const charsHeap = new Heap();
        for (const keyValue of charsMap) {
            charsHeap.push(keyValue);
        }
        treeMaker(charsHeap);

        resolve(charsHeap);
    });

export { gardener };
