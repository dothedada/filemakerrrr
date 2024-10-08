import { charEval } from './charEval';
import { errorLib } from './errorLibrary';

// TODO:
// 1. filemakerrrr
// 2. integrar tabla y compresión en compressor
// 3. exportar binario (exportBin?)
// 4. armar archivo de parseo de binario

const stringChecker = (text) => {
    if (typeof text !== 'string') {
        errorLib.dataExpected('string', text);
    }

    const stringLength = text.length;
    const charactersUsed = new Map();
    let charsUnicode = 0;

    for (const char of text) {
        charactersUsed.set(char, (charactersUsed.get(char) || 0) + 1);
        if (charEval(char).standard === 'unicode') {
            charsUnicode++;
        }
    }

    return {
        stringLength,
        charactersUsed,
        charactersUsedLength: charactersUsed.size,
        charsUnicode,
    };
};

export { stringChecker };
