import { errorLib } from './errorLibrary';

const charEval = (char) => {
    if (!char) {
        errorLib.parameterIsMissing();
    }
    if (typeof char !== 'string') {
        errorLib.dataExpected('string', char);
    }

    const code = char.charCodeAt(0);
    let standard;
    if (code <= 127) {
        standard = 'ascii';
    } else if (code <= 255) {
        standard = 'asciiExt';
    } else {
        standard = 'unicode';
    }

    return { code, standard };
};

export { charEval };
