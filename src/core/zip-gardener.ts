import type { ZipMap } from './types.js';
import { Heap } from './zip-minHeap.js';
import { treeBuilder } from './zip-treeBuilder.js';

const gardener = (charsMap: ZipMap) =>
    new Promise((resolve) => {
        const charsHeap = new Heap();
        for (const keyValue of charsMap) {
            charsHeap.push(keyValue);
        }
        treeBuilder(charsHeap);

        resolve(charsHeap);
    });

export { gardener };
