const treeBuilder = (heap) => {
    let allNodesParsed = false;

    while (!allNodesParsed) {
        const firstNode = heap.pop();
        const secondNode = heap.pop();

        const secondNodeCount = secondNode?.count || 0;

        const newNode = {
            count: firstNode.count + secondNodeCount,
            left: firstNode,
            right: secondNode,
        };

        allNodesParsed = heap.size === 0;

        heap.push(newNode);
    }
};

export { treeBuilder };
