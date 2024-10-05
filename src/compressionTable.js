import { errorLib } from './errorLibrary';
import { Heap } from './minHeap';

const compressionTable = (heapTree) => {
    if (!heapTree) {
        errorLib.parameterIsMissing();
    }
    if (!(heapTree instanceof Heap)) {
        errorLib.dataExpected('Heap', heapTree);
    }

    const table = {};
    table.zip = new Map();
    table.unzip = new Map();

    const nodeParser = (node, route = '') => {
        if (!node) {
            return;
        }

        if (node.character) {
            table.zip.set(node.character, route);
            table.unzip.set(route, node.character);
        }

        nodeParser(node.left, `${route}0`);
        nodeParser(node.right, `${route}1`);
    };
    nodeParser(heapTree.chars[0]);

    return table;
};

export { compressionTable };
