const nodeFactory = (data) => {
    if (Array.isArray(data)) {
        const [character, count] = data;
        return { character, count };
    }
    if (typeof data === 'object' && 'count' in data) {
        return data;
    }
};

export { nodeFactory };
