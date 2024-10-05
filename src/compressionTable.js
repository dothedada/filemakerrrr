import { errorLib } from './errorLibrary';

const compressionTable = (heapTree) => {
    if (!heapTree) {
        errorLib.parameterIsMissing();
    }
    const table = new Map();
    const nodeParser = (node, route = '') => {
        if (!node) {
            return;
        }

        if (node.character) {
            table.set(node.character, route);
        }

        nodeParser(node.left, `${route}0`);
        nodeParser(node.right, `${route}1`);
    };
    nodeParser(heapTree);

    return table;
};

export { compressionTable };
