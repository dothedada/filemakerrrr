import { charEval } from '../io/charEval.js';
import { toBin } from '../utils/conversion.js';
import { byteSize, zippedCharMaxLength } from '../utils/units.js';
import type { ZipMap } from './types.js';
import type { StandardsArranged } from './types.js';

export const arrangeChars = (compressionMap: ZipMap): StandardsArranged =>
    [...compressionMap].reduce<StandardsArranged>(
        (arranged, [char, bin]) => {
            const { code, standard } = charEval(char);

            if (
                standard === 'ascii' ||
                standard === 'asciiExt' ||
                standard === 'unicode'
            ) {
                const charCodeBin = toBin(code, byteSize[standard]);
                const binLength = toBin(bin.length, zippedCharMaxLength);
                const charInTable = `${charCodeBin}${binLength}${bin}`;

                arranged[standard].push(charInTable);
            }

            return arranged;
        },
        { ascii: [], asciiExt: [], unicode: [] },
    );
