import { errorLib } from './errorLibrary.js';

const nodeFactory = (data) => {
    if (!data) {
        errorLib.parameterIsMissing();
    }
    if (Array.isArray(data)) {
        if (data.length < 2) {
            errorLib.arrayLength(2);
        }
        const [character, count] = data;
        return { character, count };
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

    errorLib.dataExpected('Array [key,value] | Object', data);
};

export { nodeFactory };
