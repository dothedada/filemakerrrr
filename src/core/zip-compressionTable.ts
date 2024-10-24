import type { ZipMapBin } from './types';
import type { HuffmanNode } from './types';
import type { Heap } from './zip-minHeap';

const compressionTable = (heapTree: Heap): ZipMapBin => {
    const table = new Map();

    const nodeParser = (node: HuffmanNode, route = '') => {
        if (!node) {
            return;
        }

        if (node.character) {
            table.set(node.character, route);
        }

        if (node.left) {
            nodeParser(node.left, `${route}0`);
        }

        if (node.right) {
            nodeParser(node.right, `${route}1`);
        }
    };
    nodeParser(heapTree.chars[0]);

    return table;
};

export { compressionTable };
