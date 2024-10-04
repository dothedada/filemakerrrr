const errorLib = {
    parameterIsMissing: () => {
        throw new Error('Must provide a parameter!');
    },
    keyNotfound: (key) => {
        throw new Error(`The object must contain the key <${key}>`);
    },
    stringNotFound: (input) => {
        throw new Error(`Input must be a string, but received ${typeof input}`);
    },
    numberNotFound: (input) => {
        throw new Error(`Input must be a number, but received ${typeof input}`);
    },
    keyInMapNotFound: () => {
        throw new Error('the key provided is not in the map');
    },
    dataExpected: (expected, input) => {
        throw new Error(
            `Expected <${expected}>, instead received <${typeof input}>`,
        );
    },
};

export { errorLib };
