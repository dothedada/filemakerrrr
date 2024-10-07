import { charEval } from './charEval';
import { toBin } from './toBinary';
import { byteSize } from './units';

export const arrangeMap = (compressionMap) => {
    return [...compressionMap].reduce(
        (arranged, [char, bin]) => {
            const { code, standard } = charEval(char);
            const charBinUncompressed = toBin(code, byteSize[standard]);
            const binLength = toBin(bin.length, 4);
            const charInTable = [charBinUncompressed, binLength, bin];
            // const charInTable = `${charBinUncompressed}${binLength}${bin}`;

            arranged[standard].push(charInTable);
            return arranged;
        },
        { ascii: [], asciiExt: [], unicode: [] },
    );
};
