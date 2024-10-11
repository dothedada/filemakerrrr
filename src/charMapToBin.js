import { charEval } from './charEval.js';
import { errorLib } from './errorLibrary.js';
import { toBin } from './toBinary.js';
import { byteSize } from './units.js';

export const arrangeChars = (compressionMap) => {
    if (!compressionMap) {
        errorLib.parameterIsMissing();
    }
    if (!(compressionMap instanceof Map)) {
        errorLib.dataExpected('Map', compressionMap);
    }

    return [...compressionMap].reduce(
        (arranged, [char, bin]) => {
            const { code, standard } = charEval(char);
            const charCodeBin = toBin(code, byteSize[standard]);
            const binLength = toBin(bin.length, 4);
            const charInTable = `${charCodeBin}${binLength}${bin}`;

            arranged[standard].push(charInTable);
            return arranged;
        },
        { ascii: [], asciiExt: [], unicode: [] },
    );
};
