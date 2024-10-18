const compressionTable = (heapTree) => {
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
    nodeParser(heapTree.chars[0]);

    return table;
};

export { compressionTable };
