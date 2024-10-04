const nodeFactory = (data, key = undefined) => {
    if (!data) {
        throw new Error('Must provide a parameter!');
    }
    if (!(data instanceof Map) && typeof data !== 'object') {
        throw new Error('the first parameter must be a Map or an object');
    }
    if (data instanceof Map) {
        if (!key) {
            throw new Error('If data is a Map, the key must be provided');
        }
        if (!data.has(key)) {
            throw new Error('Key not found in map');
        }

        return { character: key, count: data.get(key) };
    }
    if (typeof data === 'object') {
        if (!('count' in data)) {
            throw new Error('The object must contain the key "count"');
        }
    }
};

export { nodeFactory };
