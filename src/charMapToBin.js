import { charEval } from './charEval.js';
import { toBin } from './toBinary.js';
import { byteSize, zippedCharMaxLength } from './units.js';

export const arrangeChars = (compressionMap) =>
    [...compressionMap].reduce(
        (arranged, [char, bin]) => {
            const { code, standard } = charEval(char);
            const charCodeBin = toBin(code, byteSize[standard]);
            const binLength = toBin(bin.length, zippedCharMaxLength);
            const charInTable = `${charCodeBin}${binLength}${bin}`;

            arranged[standard].push(charInTable);
            return arranged;
        },
        { ascii: [], asciiExt: [], unicode: [] },
    );
