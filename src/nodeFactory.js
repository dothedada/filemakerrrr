import { errorLib } from './errorLibrary';

const nodeFactory = (data, key = undefined) => {
    if (!data) {
        errorLib.parameterIsMissing();
    }
    if (data instanceof Map) {
        if (!key || !data.has(key)) {
            errorLib.keyInMapNotFound();
        }
        return { character: key, count: data.get(key) };
    }
    if (typeof data === 'object') {
        if (!('count' in data)) {
            errorLib.keyNotfound('count');
        }
        if (typeof data.count !== 'number') {
            errorLib.dataExpected('number', data.count);
        }

        return data;
    }
    if (!(data instanceof Map) && typeof data !== 'object') {
        errorLib.dataExpected('Map | Object', data);
    }
};

export { nodeFactory };
