const errorLib = {
    parameterIsMissing: () => {
        throw new Error('A parameter is missing!');
    },
    keyNotfound: (key) => {
        throw new Error(`The object must contain the key <${key}>`);
    },
    arrayLength: (arrayLength) => {
        throw new Error(`The Array must have a length of ${arrayLength}`);
    },
    keyInMapNotFound: () => {
        throw new Error('the key provided is not in the map');
    },
    dataExpected: (expected, input) => {
        throw new Error(
            `Expected <${expected}>, instead received <${typeof input}>`,
        );
    },
    wrongFileFormat: () => {
        throw new Error('');
    },
};

const msgLib = {
    en: {
        fileFormatErr: 'The file is not a valid F4R format',
    },
    es: {
        fileFormatErr: 'El archivo no es un formato F4R válido.',
    },
};

export { errorLib, msgLib };
